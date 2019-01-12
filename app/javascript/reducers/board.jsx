import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

import { initialSpaces, convertToDeath } from 'components/board'
import { generateDeck, shuffle } from 'components/cards'

const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1
  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}
const tenSides = Dice()
const sixSides = Dice(6, false)

const suit = (card) => card[card.length-1]
const rank = (card) => (card=='XJ' || card=='JO') ? card : card.slice(0, -1)
const sameSuit = (...cards) => {
  const firstSuit = suit(cards[0])
  return every(cards, c => suit(c) === firstSuit)
}
const sameRank = (...cards) => {
  const ranks = new Set(map(cards, rank))
  return ranks.size < cards.length
}
const grouped = (...cards) => {
  const ranks = cards.map(rank).map(c => Number(c))
  if (some(ranks, isNaN)) {
    return false
  }

  return every(ranks, c => c>=2 && c<=4) ||
         every(ranks, c => c>=5 && c<=7) ||
         every(ranks, c => c>=8 && c<=10)
}

export const selectedCards = (cards) => map(filter(cards, 'selected'), 'c')

export const playable = (selected) => {
  if (selected.length == 0 || selected.length > 3) {
    return false
  } else if (selected.length == 1) {
    return /^[XJQKA]/.test(selected[0])
  } else if (selected.length == 2 || selected.length == 3) {
    return sameSuit(...selected) && !sameRank(...selected) && grouped(...selected)
  }
}

export const makeFaceCard = (cards) => {
  if (!playable(cards)) { return }

  const c = cards[0]
  if (cards.length == 1) {
    return [c, 1]
  } else {
    const firstRank = rank(c)
    const face = (firstRank <= 4) ? 'J' : (firstRank <= 7 ? 'Q' : 'K')
    return [
      `${face}${suit(c)}`,
      cards.length == 3 ? 2 : 1
    ]
  }
}

const board = (
  state = {
    roll: 0,
    position: 0,
    spaces: initialSpaces,
    deck: generateDeck(),
    discards: [],
    hand: [],
    pieces: [],
  },
  action
) => {
  const {
    deck,
    discards,
    hand,
    pieces,
  } = state

  switch(action.type) {
    case 'ROLL_DICE':
      const roll = sixSides.roll()
      if (state.position + roll >= state.spaces.length) {
        return {
          ...state,
          roll,
          spaces: convertToDeath(state.spaces),
          position: 0
        }
      } else {
        return {
          ...state,
          roll,
          position: state.position + roll,
        }
      }
    case 'DRAW_CARD':
      let nextDeck, nextDiscards
      if (isEmpty(deck)) {
        nextDeck = shuffle(discards)
        nextDiscards = []
      } else {
        nextDeck = deck
        nextDiscards = discards
      }
      return {
        ...state,
        deck: nextDeck.slice(1),
        discards: nextDiscards,
        hand: hand.concat({ c: nextDeck[0], selected: false }),
      }
    case 'SELECT_CARD':
      const card = hand[action.card]
      const nextHand = [
        ...hand.slice(0, action.card),
        { c: card.c, selected: !card.selected },
        ...hand.slice(action.card+1)
      ]
      return {
        ...state,
        hand: nextHand,
      }
    case 'PLAY_SELECTED':
      return {
        ...state,
        discards: [...discards, ...action.cards],
        hand: hand.filter(c => !c.selected),
        pieces: makeFaceCard(action.cards),
      }
    case 'CLEAR_PIECES':
      return {
        ...state,
        pieces: []
      }
    default:
      return state
  }
}

export default board
