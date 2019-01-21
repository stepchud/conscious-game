import { times, random, map, filter, isEmpty, every } from 'lodash'

const CardRankMap = {
    'A': ['Ace',  14],
    'K': ['King', 13],
    'Q': ['Queen',12],
    'J': ['Jack', 11]
}

const CardSuitMap = {
    'D': 'Diamonds',
    'C': 'Clubs',
    'H': 'Hearts',
    'S': 'Spades'
}

const generateDeck = () => {
  let deck = []
  for (let suit of ['D','C','H','S']) {
    for (let j=2; j<=4; j++) {
      times(4, ()=>{deck.push(j+suit)})
    }
    for (let j=5; j<=7; j++) {
      times(3, ()=>{deck.push(j+suit)})
    }
    for (let j=8; j<=10; j++) {
      times(2, ()=>{deck.push(j+suit)})
    }
  }
  times(4, deck.push('JS'))
  times(3, deck.push('JD'))
  times(2, deck.push('JC'))
  times(2, deck.push('QD'))
  deck.push('JH')
  deck.push('QC')
  return shuffle(deck)
}

export const shuffle = (deck, num=10) => {
  const deckSize = deck.length
  const newDeck = [...deck]
  let rand =  random(deckSize-1)
  times(num, ()=>{
    for(let i=0; i<deckSize; i++){
      [newDeck[i], newDeck[rand]] = [newDeck[rand], newDeck[i]];
      rand = random(deckSize-1)
    }
  });
  return newDeck
}

const suit = (card) => card[card.length-1]
const rank = (card) => (card.card=='XJ' || card.card=='JO') ? card.card : card.card.slice(0, -1)
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
  if (filter(selected, 'played').length) {
    return false
  }
  if (selected.length == 0 || selected.length > 3) {
    return false
  }
  if (selected.length == 1) {
    return /^[XJQKA]/.test(selected[0])
  }
  if (selected.length == 2 || selected.length == 3) {
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

const cards = (
  state = {
    deck: generateDeck(),
    discards: [],
    hand: [],
    pieces: [],
  },
  action
) => {
  const {
    hand,
    deck,
    discards,
    pieces,
  } = state

  switch(action.type) {
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
      const selected = selectedCards(action.hands)
      const pieces = makeFaceCard(selected)

      if (!pieces.length) { return state }

      return {
        ...state,
        discards: [...discards, ...selected],
        hand: hand.filter(c => !c.selected),
        pieces: makeFaceCard(selected),
      }
    case 'OBEY_LAW':
      const selectedLaws = selectedCards(lawHand)
      if (selectedLaws.length !== 1) { return state }

      return {
        ...state,
        lawDiscards: [...lawDiscards, ...selectedLaws],
        lawHand: lawHand.filter(c => !c.selected),
        events: selectedLaws[0].events
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

export default cards
