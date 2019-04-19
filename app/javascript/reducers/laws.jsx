import { each, map, filter, reject, shuffle, some } from 'lodash'

import {
  selectedCards,
  sameSuit,
} from 'reducers/cards'

const LAW_CARDS = [
  {
    "card": "2D",
    "text": "YOU GET THE HICCUPS:\nCREATE MI-192.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['MI-192']}
    ]
  },
  {
    "card": "2D",
    "text": "CATCHING YOUR THING\nIN YOUR ZIPPER RESULTS\nIN NO SEX FOR TWO WEEKS:\nCREATE ALL NOTES OF FOOD.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-768','RE-384','MI-192','FA-96','SO-48','LA-24','TI-12','DO-6']}
    ]
  },
  {
    "card": "3D",
    "text": "MASTURBATE...\nLOSE TI-12.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['TI-12']}
    ]
  },
  {
    "card": "3D",
    "text": "A GOOD MEAL CREATES THE\nFIRST THREE NOTES IN THE\nFOOD OCTAVE...\nCREATE\n DO-768 RE-384 MI-192.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-768','RE-384','MI-192']}
    ]
  },
  {
    "card": "4D",
    "text": "FORGET YOUR AIM...\nLOSE RE-24.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['RE-24']}
    ]
  },
  {
    "card": "4D",
    "text": "EAT A REALLY HOT PEPPER,\nCREATE ALL HYDROGEN-96.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['FA-96','RE-96']}
    ]
  },
  {
    "card": "5D",
    "text": "A BEE STINGS YOU...\nTHE PILLS YOU TAKE\nCREATE FA-96 SO-48.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['FA-96','SO-48']}
    ]
  },
  {
    "card": "5D",
    "text": "SKIP A MEAL...\nLOSE DO-768.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-768']}
    ]
  },
  {
    "card": "6D",
    "text": "YOU GET THE FLU...\nLOSE FA-96 AND SO-48.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['FA-96','SO-48']}
    ]
  },
  {
    "card": "6D",
    "text": "DO THE SLOW EATING\nEXERCISE: CREATE DO-768.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-768']}
    ]
  },
  {
    "card": "7D",
    "text": "FORGET TO BREATHE\nWHEN YOU EAT...\nLOSE ALL HYDROGEN-192.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['MI-192','DO-192']}
    ]
  },
  {
    "card": "7D",
    "text": "PROPER DIET...\nCREATE T1-12 LA-24.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['LA-24','TI-12']}
    ]
  },
  {
    "card": "8D",
    "text": "WATCH AN EMOTIONAL MOVIE:\nCREATE LA-6.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['LA-6']}
    ]
  },
  {
    "card": "8D",
    "text": "INTENTIONALLY LIE\nTO THE TEACHER...\nLOSE FA-6 AND THE\nNEXT HIGHEST NOTE FILLED.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['FA-6', 'HIGHEST-IMPRESSION']}
    ]
  },
  {
    "card": "9D",
    "text": "A LITTLE ALCOHOL\nCREATE DO-6.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-6']}
    ]
  },
  {
    "card": "9D",
    "text": "FAINT FROM THE SIGHT\nOF BLOOD:\nLOSE ALL HYDROGEN-96.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['FA-96','RE-96']}
    ]
  },
  {
    "card": "10D",
    "text": "WORKING IN THE MINES\nPOISONS YOUR LUNGS...\nLOSE YOUR AIR OCTAVE.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-192','RE-96','MI-48','FA-24','SO-12','LA-6']}
    ]
  },
  {
    "card": "10D",
    "text": "PRACTICE OPPOSITE\nPOSTURES:\nCREATE ALL HYDROGEN-24.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['LA-24','FA-24','RE-24']}
    ]
  },
  {
    "card": "JD",
    "text": "MECHANICAL LIFE:\nSTAY ASLEEP FOR\n21 SPACES.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 18},
      {type: 'MECHANICAL', lost: 'sleep', for: 21},
    ]
  },
  {
    "card": "QD",
    "text": "PUT OTHERS FIRST...\nTRANSFORM EMOTIONS",
    "actions": [
      {type: 'TRANSFORM_EMOTIONS'}
    ]
  },
  {
    "card": "KD",
    "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL\nLAWS OF ACCIDENT.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 20},
      {type: 'REMOVE_ACTIVE', suit: 'D'},
    ]
  },
  {
    "card": "AD",
    "text": "WALKING TO YOUR CAR DURING\nA THUNDERSTORM AND ZAP,\nYOU ARE HIT BY LIGHTNING:\nINSTANT DEATH!",
    "actions": [
      {type: 'DEATH_SPACE', in: 0},
      {type: 'ACTIVE_LAW', card: 21},
    ]
  },
  {
    "card": "2C",
    "text": "TAKE THE LAW CARD FROM THE\nTOP THAT EQUALS YOUR TYPE\nAND OBEY IT WITHOUT ESCAPE\n(DISCARD LAWS IN BETWEEN).",
    "actions": [
      {type: 'OBEY_WITHOUT_ESCAPE', card: '2C'}
    ]
  },
  {
    "card": "2C",
    "text": "LIE STILL FOR ONE HOUR:\nCREATE ALL HYDROGEN-12.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['TI-12','SO-12','MI-12']}
    ]
  },
  {
    "card": "3C",
    "text": "MEMORIZE 1001 WORDS\nAND RECEIVE THE\nMASTER EXERCISES:\nCREATE ALL IMPRESSIONS.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-48','RE-24','MI-12','FA-6']}
    ]
  },
  {
    "card": "3C",
    "text": "FAIL TO INSULATE YOURSELF:\nLOSE FA-6.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['FA-6']}
    ]
  },
  {
    "card": "4C",
    "text": "REMEMBERING YOUR OBJECTIVE\nPRAYER: CREATE A MAGNETIC\nCENTER MOMENT.",
    "actions": [
      {type: 'MAGNETIC_CENTER_MOMENT'},
    ]
  },
  {
    "card": "4C",
    "text": "CIGARETTE SMOKING WIPES\nOUT THE FIRST THREE NOTES\nIN THE AIR OCTAVE...\nLOSE DO-192 RE-96 MI-48",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-192','RE-96','MI-48']}
    ]
  },
  {
    "card": "5C",
    "text": "HAVE A LAPSE IN\nCONCENTRATION: LOSE DO-48.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-48']}
    ]
  },
  {
    "card": "5C",
    "text": "OBEY THE MASTER:\nTRANSFORM ALL MI-12 TO\nFA-6 AND ALL TI-12\n(OR HIGHEST FOOD) TO DO-6.",
    "actions": [
      {type: 'TRANSFORM_MI_TI_12_TO_6'},
    ]
  },
  {
    "card": "6C",
    "text": "SOMEONE STARTLES YOU:\nCREATE DO-192.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-192']}
    ]
  },
  {
    "card": "6C",
    "text": "INTERNAL CONSIDER:\nLOSE THE FIRST 3 NOTES OF\nFOOD AND AIR AND THE\nFIRST IMPRESSION (3-3-1).",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-768','RE-384','MI-192','DO-192','RE-96','MI-48','DO-48']}
    ]
  },
  {
    "card": "7C",
    "text": "SWALLOW WATER WHILE\nSWIMMING: LOSE MI-48.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['MI-48']}
    ]
  },
  {
    "card": "7C",
    "text": "YOUR UNCONSCIOUS MUSCLE\nMOVEMENT LETS EVERYONE\nKNOW THAT YOU ARE A BOOBY:\nLOSE TI-12 AND LA-24.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['TI-12','LA-24']}
    ]
  },
  {
    "card": "8C",
    "text": "PRACTICE THE CHI EXERCISE:\nCREATE ALL HYDROGEN-48.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-48','MI-48','SO-48']}
    ]
  },
  {
    "card": "8C",
    "text": "TOURING YOUR LAND YOU\nARE BIT BY A SNAKE...\nLOSE DO-6 AND THE NEXT\nHIGHEST NOTE FILLED.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-6','HIGHEST-FOOD']}
    ]
  },
  {
    "card": "9C",
    "text": "FORGET TO MAKE\nONE THING YOUR GOD:\nLOSE ALL HYDROGEN-48.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-48','MI-48','SO-48']}
    ]
  },
  {
    "card": "9C",
    "text": "RIGHT PRAYER:\nCREATE ALL HYDROGEN-6.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-6','LA-6','FA-6']}
    ]
  },
  {
    "card": "10C",
    "text": "STOP YOURSELF\nAND TAKE A DEEP BREATH:\nSHOCKS FOOD.",
    "actions": [
      {type: 'SHOCKS_FOOD'}
    ]
  },
  {
    "card": "10C",
    "text": "GO AGAINST THE WORK\nFOR SELFISH REASONS:\nLOSE ALL IMPRESSIONS.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-48','RE-24','MI-12','FA-6']}
    ]
  },
  {
    "card": "JC",
    "text": "MECHANICAL LIFE:\nLOSE YOUR SKILLS\nFOR 37 SPACES.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 40},
      {type: 'MECHANICAL', lost: 'noskills', for: 37},
    ]
  },
  {
    "card": "QC",
    "text": "GOD SENDS A MESSAGE AND\nEVERY PERSON RECEIVES IT:\nALL SELF-REMEMBER.",
    "actions": [
      {type: 'SELF_REMEMBER'}
    ]
  },
  {
    "card": "KC",
    "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL LAWS\nOF CAUSE AND EFFECT.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 42},
      {type: 'REMOVE_ACTIVE', suit: 'C'},
    ]
  },
  {
    "card": "AC",
    "text": "BITING YOUR NAILS LEADS\nTO A FORM OF CANCER:\nDEATH COMES IN 41 SPACES!",
    "actions": [
      {type: 'ACTIVE_LAW', card: 43},
      {type: 'DEATH_SPACE', in: 41},
    ]
  },
  {
    "card": "2H",
    "text": "FORGET TO REMEMBER\nTHE COMPLETING PRINCIPLE:\nLOSE DO-6.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-6']}
    ]
  },
  {
    "card": "3H",
    "text": "STAND UP TOO FAST:\nLOSE DO-192.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-192']}
    ]
  },
  {
    "card": "4H",
    "text": "PICK A CENTER:\nDRAW ONE CARD.",
    "actions": [
      {type: 'DRAW_CARD'}
    ]
  },
  {
    "card": "5H",
    "text": "MANIFEST UNCONTROLLED\nIMAGINATION: LOSE LA-6.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['LA-6']}
    ]
  },
  {
    "card": "6H",
    "text": "SPEND YOUR DAY IN VANITY\nAND SELF LOVE:\nLOSE MI-12 AND RE-24.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['RE-24','MI-12']}
    ]
  },
  {
    "card": "6H",
    "text": "MAKE ONE THING YOUR GOD:\nPLAY ADDITIONAL LAW\nBY CHOICE.",
    "actions": [
      {type: 'LAW_BY_CHOICE'}
    ]
  },
  {
    "card": "7H",
    "text": "SMOKING POT CREATES\nFA-24 AND SO-12.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['FA-24','SO-12']}
    ]
  },
  {
    "card": "7H",
    "text": "EAT AT A DIRTY\nRESTAURANT: LOSE MI-192.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['MI-192']}
    ]
  },
  {
    "card": "8H",
    "text": "PRACTICE THREEFOLD\nATTENTION: ADD THREE\nLAWS TO YOUR LAW PILE.",
    "actions": [
      {type: 'DRAW_LAW_CARD'},
      {type: 'DRAW_LAW_CARD'},
      {type: 'DRAW_LAW_CARD'},
    ]
  },
  {
    "card": "8H",
    "text": "LEARN THIRD RESPONSE:\nDRAW FIVE CARDS.",
    "actions": [
      {type: 'DRAW_CARD'},
      {type: 'DRAW_CARD'},
      {type: 'DRAW_CARD'},
      {type: 'DRAW_CARD'},
      {type: 'DRAW_CARD'},
    ]
  },
  {
    "card": "9H",
    "text": "BREATHE NEGATIVE IONS:\nSHOCK ALL MI-48 TO LA-6,\nOR ENTER MI-48 IF NONE\nEXISTS.",
    "actions": [
      {type: 'SHOCK_MI48_LA6'}
    ]
  },
  {
    "card": "9H",
    "text": "HOLDING ACCOUNTS COSTS\nYOU ALL HYDROGEN-12:\nLOSE TI-12 MI-12 SO-12",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['TI-12','SO-12','MI-12']}
    ]
  },
  {
    "card": "10H",
    "text": "HAVE YOUR COFFEE WHILE\nYOU WATCH THE SUN RISE:\nCREATE ALL HYDROGEN-192.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['MI-192','DO-192']}
    ]
  },
  {
    "card": "10H",
    "text": "A CAR CROSSES MEDIAN,\nHITTING YOU AT 60 MPH:\nLOSE ALL YOUR FOOD.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-768','RE-384','MI-192','FA-96','SO-48','LA-24','TI-12','DO-6']}
    ]
  },
  {
    "card": "JH",
    "text": "MECHANICAL LIFE:\nLOSE YOUR POWERS\nFOR 33 SPACES.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 58},
      {type: 'MECHANICAL', lost: 'nopowers', for: 33},
    ]
  },
  {
    "card": "QH",
    "text": "PLAY THIS CARD AFTER\nANY ROLL AND TAKE\nTHE OPPOSITE SIDE\nOF THE DIE.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 59},
    ]
  },
  {
    "card": "KH",
    "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH\nFREES YOU FROM ALL\nLAWS OF FATE.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 60},
      {type: 'REMOVE_ACTIVE', suit: 'H'},
    ]
  },
  {
    "card": "AH",
    "text": "AN OLD FAMILY DISEASE\nMANIFESTS IN YOUR BEING:\nDEATH COMES IN 27 SPACES!",
    "actions": [
      {type: 'ACTIVE_LAW', card: 61},
      {type: 'DEATH_SPACE', in: 27},
    ]
  },
  {
    "card": "2S",
    "text": "TAKE ONE LAW CARD FROM\nTHE TOP, WHICH EVERYONE\nMUST OBEY WITHOUT ESCAPE.",
    "actions": [
      {type: 'OBEY_WITHOUT_ESCAPE', card: '2S'}
    ]
  },
  {
    "card": "3S",
    "text": "PRACTICE THE TWO ENDS\nOF THE STICK EXERCISE:\nCREATE DO-48.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['DO-48']}
    ]
  },
  {
    "card": "3S",
    "text": "LAZINESS OF MIND:\nLOSE THE FIRST\nFILLED IMPRESSION.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['LOWEST-IMPRESSION']}
    ]
  },
  {
    "card": "4S",
    "text": "BREATHE WHEN YOU EAT:\nSHOCK ALL MI-192\nTO TI-12, OR ENTER MI-192\nIF NONE EXISTS",
    "actions": [
      {type: 'SHOCK_MI_192_TI_12'}
    ]
  },
  {
    "card": "4S",
    "text": "YOU GET A POTATO CHIP\nCAUGHT IN YOUR THROAT:\nTHROW UP THE FIRST THREE\nNOTES OF FOOD.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-768','RE-384','MI-192']}
    ]
  },
  {
    "card": "5S",
    "text": "LAUGHTER!\nCREATES RE-24.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['RE-24']}
    ]
  },
  {
    "card": "5S",
    "text": "RAMBLE ON AND ON...\nLOSE ALL HYDROGEN-24.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['LA-24','FA-24','RE-24']}
    ]
  },
  {
    "card": "6S",
    "text": "ASTHMA ATTACK...\nLOSE FA-24 AND SO-12.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['FA-24','SO-12']}
    ]

  },
  {
    "card": "6S",
    "text": "REMEMBER TO PICK A CENTER:\nPLAY ONE ADDITIONAL LAW\nBY RANDOM DRAW.",
    "actions": [
      {type: 'LAW_BY_RANDOM'}
    ]
  },
  {
    "card": "7S",
    "text": "A WISE MAN TELLS YOU AN\nANCIENT TRUTH: MI-12 IS\nCREATED IN YOUR BEING.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['MI-12']}
    ]
  },
  {
    "card": "7S",
    "text": "LOSE YOUR TEMPER:\nLOSE MI-12.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['MI-12']}
    ]
  },
  {
    "card": "8S",
    "text": "FORGET TO PICK A CENTER:\nDISCARD ALL LAW CARDS\nNOT IN PLAY.",
    "actions": [
      {type: 'DISCARD_LAW_HAND'}
    ]
  },
  {
    "card": "8S",
    "text": "IMPROPER BREATHING\nEXERCISE DESTROYS LA-6\nAND THE NEXT HIGHEST\nNOTE FILLED.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['LA-6','HIGHEST-AIR']}
    ]
  },
  {
    "card": "9S",
    "text": "EXPERIENCE A DEEP CALMNESS\nAFTER LYING STILL FOR\nONE HOUR: CREATE FA-6.",
    "actions": [
      {type: 'ADD_NOTES', notes: ['FA-6']}
    ]
  },
  {
    "card": "9S",
    "text": "DAY DREAM:\nDISCARD ONE CARD\nBY RANDOM.",
    "actions": [
      {type: 'DISCARD_BY_RANDOM'},
    ]
  },
  {
    "card": "10S",
    "text": "MANIFEST FROM CONSCIENCE:\nUSE THIS CARD TO ROLL AGAIN\nAFTER ANY ROLL.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 77},
    ]
  },
  {
    "card": "10S",
    "text": "DOUBLE CRYSTALLIZE:\nLOSE HALF YOUR CARDS.",
    "actions": [
      {type: 'LOSE_HALF_CARDS'}
    ]
  },
  {
    "card": "JS",
    "text": "FORMATORY:\nLOSE HYDROGEN-6.",
    "actions": [
      {type: 'TAKE_NOTES', notes: ['DO-6','LA-6','FA-6']}
    ]
  },
  {
    "card": "QS",
    "text": "CREATE RIGHT VALUE:\nALL SHOCKS ARE BROUGHT\nTO YOUR BEING.",
    "actions": [
      {type: 'TRANSFORM_EMOTIONS'},
      {type: 'SELF_REMEMBER'},
      {type: 'SHOCKS_FOOD'},
    ]
  },
  {
    "card": "KS",
    "text": "CREATE MOON IN YOURSELF:\nKEEP THIS CARD, WHICH FREES\nYOU FROM ALL LAWS OF WILL.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 81},
      {type: 'REMOVE_ACTIVE', suit: 'S'},
    ]
  },
  {
    "card": "AS",
    "text": "A CRAZED IDENTIFIED MAN\nCLIMBS A TOWER AND\nSHOOTS 17 PEOPLE TO DEATH;\nYOU ARE ONE OF THEM!",
    "actions": [
      {type: 'ACTIVE_LAW', card: 82},
      {type: 'DEATH_SPACE', in: 0},
    ]
  },
  {
    "card": "XJ",
    "text": "ALL THREE-BRAINED BEINGS\nFEEL THE POWER OF ETERNAL\nFORGIVNESS, CANCELS ALL\nLAW CARDS IN PLAY.",
    "actions": [
      {type: "CANCEL_ALL_LAWS"}
    ]
  },
  {
    "card": "JO",
    "text": "HASNAMUSS:\nEXERCISE NO ROLL OPTIONS\nFOR THE DURATION OF YOUR EXISTENCE.",
    "actions": [
      {type: 'ACTIVE_LAW', card: 84},
      {type: 'HASNAMUSS'},
    ]
  }
]

const KD_INDEX=20
const KC_INDEX=42
const KH_INDEX=60
const KS_INDEX = 81

export const lawAtIndex = (law) => LAW_CARDS[law.index]
export const selectedLaws = (cards) => filter(cards, 'selected')
export const selectedPlayedLaws = (cards) => filter(cards, {'selected': true, 'played': true})
export const unobeyedLaws = (cards) => filter(cards, c => !c.obeyed)
export const hasnamuss = (active) => active.map(a => a.index).includes(84)
export const queenHearts = (active) => active.map(a => a.index).includes(59)
export const tenSpades = (active) => active.map(a => a.index).includes(77)

const activeKings = (active) => map(
         filter(active, (c) => [ KD_INDEX, KC_INDEX, KH_INDEX, KS_INDEX ].includes(c.index)),
  lawAtIndex
)
const isLawCard = (card) => {
  if (card == '10S') {
    return (law) => law.index == 77
  } else if (card == 'QH') {
    return (law) => law.index == 59
  }
}
const isLawSuit = (suit) => {
  switch(suit) {
    case 'D':
      return (law) => law.index < 22 && law.index != KD_INDEX && !law.protected
    case 'C':
      return (law) => law.index >= 22 && law.index < 44 && law.index != KC_INDEX && !law.protected
    case 'H':
      return (law) => law.index >= 44 && law.index < 62 && law.index != KH_INDEX && !law.protected
    case 'S':
      return (law) => law.index >= 62 && law.index < 83 && law.index != KS_INDEX && !law.protected
  }
}

const drawLawCard = (preDeck, preDisc) => {
  let deck, discards
  if (preDeck.length == 0) {
    deck = shuffle(preDisc)
    discards = []
  } else {
    deck = preDeck
    discards = preDisc
  }
  return {
    law: deck[0],
    deck: deck.slice(1),
    discards,
  }
}

const generateLawDeck = () => {
  const newDeck = LAW_CARDS.slice(62)
  let temp = newDeck[1]
  newDeck[1] = newDeck[21]
  newDeck[21] = temp
  temp = newDeck[3]
  newDeck[3] = newDeck[15]
  newDeck[15] = temp
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
      const { law, deck: nextDeck, discards: nextDiscards } = drawLawCard(deck, discards)
      return {
        ...state,
        deck: nextDeck,
        discards: nextDiscards,
        hand: hand.concat({ c: law, selected: false }),
      }
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
      if (action.card == '2S') {
        const draw = drawLawCard(deck, discards)
        return {
          ...state,
          in_play: in_play.concat({ c: draw.law, selected: false, no_escape: '2S' }),
          deck: draw.deck,
          discards: draw.discards,
        }
      } else if (action.card == '2C') {
        let draw = drawLawCard(deck, discards)
        for (let i=1; i<action.being_type; i++) {
          draw = drawLawCard(draw.deck, draw.discards.concat(draw.law))
        }

        return {
          ...state,
          in_play: in_play.concat({ c: draw.law, selected: false, no_escape: '2C' }),
          deck: draw.deck,
          discards: draw.discards,
        }
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
        // roll option cards
        filterFunc = isLawCard(action.card)
      }
      const filteredActive = map(reject(active, filterFunc), removeProtected)
      return {
        ...state,
        active: filteredActive,
      }
    case 'ROLL_AFTER_DEATH':
    case 'ROLL_DICE':
      return {
        ...state,
        discards: discards.concat(map(in_play, 'c')),
        in_play: [],
      }
    case 'CANCEL_ALL_LAWS':
      const newActive = map(filter(active, 'protected'), l => ({ index: l.index, protected: false }))
      return {
        ...state,
        active: newActive,
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
