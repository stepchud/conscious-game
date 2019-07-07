import {
  each,
  map,
  filter,
  reject,
  shuffle,
  some,
  indexOf,
  partition,
} from 'lodash'

import {
  selectedCards,
  sameSuit,
} from 'reducers/cards'

import {
  LAW_DECK,
  KD,
  KC,
  KH,
  KS,
} from '../constants'

export const lawAtIndex = (law) => LAW_DECK[law.index]
export const selectedLaws = (cards) => filter(cards, 'selected')
export const selectedPlayedLaws = (cards) => filter(cards, {'selected': true, 'played': true})
export const unobeyedLaws = (cards) => filter(cards, c => !c.obeyed)
export const hasnamuss = (active) => active.map(a => a.index).includes(84)
export const jackDiamonds = (active) => active.map(a => a.index).includes(18)
export const jackClubs = (active) => active.map(a => a.index).includes(40)
export const jackHearts = (active) => active.map(a => a.index).includes(58)
export const queenHearts = (active) => active.map(a => a.index).includes(59)
export const tenSpades = (active) => active.map(a => a.index).includes(77)

const activeKings = (active) => map(
         filter(active, (c) => [ KD, KC, KH, KS ].includes(c.index)),
  lawAtIndex
)
const isLawCard = (card) => {
  if (card == 'JD') {
    return (law) => law.index == 18
  } else if (card == 'JC') {
    return (law) => law.index == 40
  } else if (card == 'JH') {
    return (law) => law.index == 58
  } else if (card == 'QH') {
    return (law) => law.index == 59
  } else if (card == '10S') {
    return (law) => law.index == 77
  } else if (card == 'JO') {
    return (law) => law.index == 84
  }
}
const isLawSuit = (suit) => {
  switch(suit) {
    case 'D':
      return (law) => law.index < 22 && law.index != KD && !law.protected
    case 'C':
      return (law) => law.index >= 22 && law.index < 44 && law.index != KC && !law.protected
    case 'H':
      return (law) => law.index >= 44 && law.index < 62 && law.index != KH && !law.protected
    case 'S':
      return (law) => law.index >= 62 && law.index < 83 && law.index != KS && !law.protected
  }
}

const drawLawCard = (state) => {
  let {
    deck,
    discards,
  } = state
  if (!deck.length) {
    deck = shuffle(discards)
    discards = []
  }
  return {
    ...state,
    hand: hand.concat({ c: deck[0], selected: false }),
    deck: deck.slice(1),
    discards,
  }
}

const generateLawDeck = () => {
  const newDeck = shuffle(LAW_DECK.slice(0))
  //let temp = newDeck[1]
  //newDeck[1] = newDeck[10]
  //newDeck[10] = temp
  //temp = newDeck[3]
  //newDeck[2] = newDeck[19]
  //newDeck[19] = temp
  return newDeck
}

const laws = (
  state = {
    deck: [],
    hand: [],
    active: [],
    discards: [],
    in_play: [],
    actions: [],
  },
  action
) => {
  const {
    active,
    hand,
    in_play,
    deck,
    discards,
  } = state
  switch(action.type) {
    case 'DRAW_LAW_CARD': {
      return drawLawCard(state)
    }
    case 'START_GAME':
      const newDeck = generateLawDeck()
      return {
        ...state,
        deck: newDeck.slice(3),
        hand: hand.concat([
          { c: newDeck[0], selected: false },
          { c: newDeck[1], selected: false },
          { c: newDeck[2], selected: false }
        ])
      }
    case 'SELECT_LAW_CARD':
      const card = in_play[action.card]
      return {
        ...state,
        in_play: [
          ...in_play.slice(0, action.card),
          { ...card, selected: !card.selected },
          ...in_play.slice(action.card+1)
        ],
      }
    case 'ONE_BY_RANDOM':
      // empty hand or rolled a 0 ("none by random")
      if (!hand.length || !action.roll) {
        return state
      }
      const shuffledHand = shuffle(hand)
      const randomIndex = (action.roll - 1) % shuffledHand.length
      return {
        ...state,
        in_play: in_play.concat(shuffledHand[randomIndex]),
        hand: shuffledHand.filter((v, idx) => idx != randomIndex),
      }
    case 'ONE_BY_CHOICE':
      const chosenIndex = action.card
      return {
        ...state,
        in_play: in_play.concat(hand[chosenIndex]),
        hand: hand.filter((v, idx) => idx != chosenIndex),
      }
    case 'OBEY_WITHOUT_ESCAPE': {
      let nextState = drawLawCard(state)
      let newLaw = nextState.hand.pop()
      if (action.card == '2C') {
        for (let i=1; i<action.being_type; i++) {
          nextState = drawLawCard(nextState)
          newLaw = nextState.hand.pop()
        }
      }
      return {
        ...nextState,
        in_play: in_play.concat({ c: newLaw, selected: false, no_escape: action.card }),
      }
    }
    case 'PLAY_SELECTED':
      if (!action.pieces) { return state }

      // mark laws as played, cards reducer handles piece creation
      return {
        ...state,
        in_play: map(in_play, (c) => ({
            ...c,
            selected: c.selected ? false : c.selected,
            played: c.selected ? true : c.played,
        })),
      }
    case 'DISCARD_LAW_HAND':
      return {
        ...state,
        discards: discards.concat(map(hand, 'c')),
        hand: []
      }
    case 'OBEY_LAW': {
      const selectedLaws = filter(in_play, 'selected')
      if (selectedLaws.length !== 1) {
        console.log("only 1 law play at a time")
        return state
      }
      const lawCard = selectedLaws[0]
      if (lawCard.obeyed) {
        console.log("already obeyed ", lawCard)
        return state
      }

      let nextState = {
        ...state,
        in_play: map(in_play, (c) => {
          return c.selected ?
            {
              ...c,
              selected: false,
              obeyed: true
            } : {
              ...c
            }
        }),
      }

      const actions = lawCard.c.actions
      if (lawCard.no_escape) {
        console.log("no escape!")
        each(
          filter(actions, c => c.type == 'ACTIVE_LAW'),
          c => c.protected = lawCard.no_escape
        )
      } else if (some(activeKings(active), (k) => sameSuit(k.card, lawCard.c.card))) {
        console.log("Moon escapes! ", lawCard)
        return nextState
      }

      return {
        ...nextState,
        actions,
      }
    }
    case 'ACTIVE_LAW':
      return {
        ...state,
        active: active.concat({index: action.card, protected: action.protected}),
      }
    case 'REMOVE_ACTIVE':
      let filterFunc
      let removeProtected = unit => unit
      if (action.suit) {
        // king moon
        filterFunc = isLawSuit(action.suit)
        removeProtected = c => {
          if ((action.suit == 'C' && c.protected == '2C') ||
              (action.suit == 'S' && c.protected == '2S')) {
            delete c.protected
          }
          return c
        }
      } else if (action.card) {
        // roll option cards & cleansed joker
        filterFunc = isLawCard(action.card)
      }
      const filteredActive = map(reject(active, filterFunc), removeProtected)
      return {
        ...state,
        active: filteredActive,
      }
    case 'END_DEATH': {
      const discarded = map(hand.concat(in_play), 'c').concat(map(active, lawAtIndex))
      return {
        ...state,
        discards: discards.concat(discarded),
        hand: [],
        active: [],
        in_play: [],
        actions: [],
      }
    }
    case 'REINCARNATE': {
      // discard everything but the active Joker
      const [nextActive, discardActve] = partition(active, isLawCard('JO'))
      const discarded = map(hand.concat(in_play), 'c').concat(map(discardActve, lawAtIndex))
      let nextState = {
        ...state,
        discards: discards.concat(discarded),
        hand: [],
        active: nextActive,
        in_play: [],
        actions: [],
      }
      for (let i=0; i<3; i++) {
        nextState = drawLawCard(nextState)
      }
      return nextState
    }
    case 'ROLL_DICE': {
      // don't discard active laws (they could be re-drawn)
      const actives = map(active, 'index')
      const inPlay = map(in_play, 'c').filter(
        (l) => !actives.contains(indexOf(LAW_DECK, (ld) => ld.card == l.card))
      )
      return {
        ...state,
        discards: discards.concat(inPlay),
        in_play: [],
      }
    }
    case 'CANCEL_ALL_LAWS':
      const newActive = map(filter(active, 'protected'), l => ({ index: l.index, protected: false }))
      const newInPlay = map(in_play, lc => {
        if (lc.no_escape) {
          delete lc.no_escape
          return lc
        } else {
          return  {
            ...lc,
            obeyed: true
          }
        }
      })
      return {
        ...state,
        active: newActive,
        in_play: newInPlay,
      }
    case 'CLEAR_ACTIONS':
      return {
        ...state,
        actions: []
      }
    default:
      return state
  }
}

export default laws
