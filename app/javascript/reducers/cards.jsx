import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

const selectedCards = (cards) => map(filter(cards, 'selected'), 'c')
const suit = (card) => card[card.length-1]
const rank = (card) => (card=='XJ' || card=='JO') ? card : card.slice(0, -1)
const sameSuit = (...cards) => {
  const firstSuit = suit(cards[0])
  return every(cards, c => suit(c) === firstSuit)
}
const sameRank = (...cards) => {
  const ranks = new Set(map(cards, rank))
  return ranks.length < cards.length
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


export const playableCards = (cards) => {
  const selected = selectedCards(cards)
  if (selected.length == 0 || selected.length > 3) {
    return false
  } else if (selected.length == 1) {
    return /^[XJQKA]/.test(selected[0])
  } else if (selected.length == 2 || selected.length == 3) {
    return sameSuit(...selected) && !sameRank(...selected) && grouped(...selected)
  }
}

const cards = ( state = {}, action ) => {
  const {
    deck,
    discards,
    hand
  } = state
  switch(action.type) {
    case 'DRAW_CARD':
      let nextDeck, nextDiscards
      if (isEmpty(deck)) {
        nextDeck = Deck.shuffle(discards)
        nextDiscards = []
      } else {
        nextDeck = deck
        nextDiscards = discards
      }
      return {
        deck: nextDeck.slice(1),
        discards: nextDiscards,
        hand: hand.concat({ c: nextDeck[0], selected: false })
      }
    case 'SELECT_CARD':
      const card = hand[action.card]
      const nextHand = [
        ...hand.slice(0, action.card),
        { c: card.c, selected: !card.selected },
        ...hand.slice(action.card+1)
      ]
      return {
        deck,
        discards,
        hand: nextHand
      }
    case 'PLAY_SELECTED':
      const selected = selectedCards(hand)
      return {
        deck,
        discards,
        hand
      }
    default:
      return state
  }
}

export default cards
