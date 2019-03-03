import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore} from 'redux'
import { filter, map, includes } from 'lodash'

import Buttons from 'components/buttons'
import TestButtons from 'components/test_buttons'
import Board   from 'components/board'
import { CardHand, LawHand } from 'components/cards'
import FoodDiagram, { processExtra } from 'components/food'
import ThreeBrains from 'components/being'

// reducers
import board from 'reducers/board'
import cards, { sameSuit, makeFaceCard } from 'reducers/cards'
import laws, { hasnamuss, queenHearts, tenSpades } from 'reducers/laws'
import fd, { entering, hasNewBody } from 'reducers/food_diagram'
import ep, { rollOptions } from 'reducers/being'

const game = combineReducers({ board, cards, laws, fd, ep })
const store = createStore(game)

const presentEvent = (event) => {
  switch(event) {
    case 'DEPUTY-STEWARD':
      alert('After some time, with the help of magnetic center, a man may find a school.')
      store.dispatch({ type: 'FOUND_SCHOOL' })
      break
    case 'STEWARD':
      alert('April Fools! You have attained Steward')
      store.dispatch({ type: 'ATTAIN_STEWARD' })
      break
    case 'MASTER':
      alert('Impartiality! You have attained Master')
      store.dispatch({ type: 'ATTAIN_MASTER' })
      break
    case 'MENTAL-BODY':
      alert('You have a mental body')
      break
    case 'ASTRAL-BODY':
      alert('You have an astral body')
      break
    case 'EXTRA-IMPRESSION':
      if (confirm('Extra Impression: Draw a card?\nCancel to take it back in as Air.')) {
        store.dispatch({type: 'DRAW_CARD'})
      } else {
        store.dispatch({type: 'BREATHE_AIR'})
      }
      break
    case 'EXTRA-AIR':
      if (confirm('Extra Air: Draw a card?\nCancel to take it back in as Food.')) {
        store.dispatch({type: 'DRAW_CARD'})
      } else {
        store.dispatch({type: 'EAT_FOOD'})
      }
      break
    case 'EXTRA-FOOD':
      alert('Extra Food: Draw a card.')
      store.dispatch({type: 'DRAW_CARD'})
      break
    case 'SELF-REMEMBER':
      store.dispatch({type: 'SELF_REMEMBER'})
      break
    case 'TRANSFORM-EMOTIONS':
      store.dispatch({type: 'TRANSFORM_EMOTIONS'})
      break
    case 'WILD-SHOCK':
      if (confirm('Wild Shock! Transform Emotions?\nCancel to choose another option')) {
        store.dispatch({type: 'TRANSFORM_EMOTIONS'})
      } else {
        if (confirm('Press "OK" to Self-Remember, "Cancel" to Shock Food.')) {
          store.dispatch({type: 'SELF_REMEMBER'})
        } else {
          store.dispatch({type: 'SHOCKS_FOOD'})
        }
      }
      break
    case 'ALL-SHOCKS':
      store.dispatch({type: 'TRANSFORM_EMOTIONS'})
      store.dispatch({type: 'SELF_REMEMBER'})
      store.dispatch({type: 'SHOCKS_FOOD'})
      break
    case 'SHOCKS-FOOD':
      store.dispatch({type: 'SHOCKS_FOOD'})
      break
    case 'SHOCKS-AIR':
      store.dispatch({type: 'SHOCKS_AIR'})
      break
    case 'C-12':
      alert('Carbon 12')
      store.dispatch({type: 'DRAW_CARD'})
      break
    case 'LA-24':
      alert('No 6')
      break
    case 'RE-24':
      alert('No 6')
      break
    case 'SO-48':
      alert('No 12')
      break
    case 'MI-48':
      const ewb = store.getState().ep.ewb
      if (ewb && confirm('Eat when you breathe?')) {
        store.dispatch({type: 'EAT_WHEN_YOU_BREATHE'})
      } else {
        store.dispatch({type: 'LEAVE_MI_48'})
      }
      break
    case 'DO-48':
      const c12 = store.getState().ep.c12
      if (c12 && confirm('Carbon-12?')) {
        store.dispatch({type: 'CARBON_12'})
      } else {
        store.dispatch({type: 'LEAVE_DO_48'})
      }
      break
    case 'RE-96':
      alert('No 24')
      break
    case 'FA-96':
      alert('No 24')
      break
    case 'MI-192':
      const bwe = store.getState().ep.bwe
      if (bwe && confirm('Breathe when you eat?')) {
        store.dispatch({type: 'BREATHE_WHEN_YOU_EAT'})
      } else {
        store.dispatch({type: 'LEAVE_MI_192'})
      }
      break
    case 'DO-192':
      alert('No 48')
      break
    case 'RE-384':
      alert('No 96')
      break
    case 'DO-768':
      alert('No 192')
      break
    case 'BURP':
      alert('Brrrp!')
      break
    case 'HYPERVENTILATE':
      alert('Hyperventilate!')
      break
    case 'VOID':
      alert('Pouring from the empty into the void.')
      break
    case 'NOTHING-TO-REMEMBER':
      alert('Nothing to Remember.')
      break
    default:
      console.warn(`presentEvent unknown event: ${event}`)
  }
}

const handleExtras = () => {
  store.getState().fd.extras.forEach(extra => presentEvent(extra))
  store.dispatch({ type: 'CLEAR_EXTRAS' })
  if (entering(store.getState().fd.enter)) {
    dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
  }
}

const dispatchWithExtras = (action) => {
  store.dispatch(action)
  handleExtras()
}

const handleRollOptions = () => {
  const active = store.getState().laws.active
  // HASNAMUSS: no roll-options
  if (hasnamuss(active)) { return }

  let roll = store.getState().board.roll
  let options = rollOptions(store.getState().ep.level_of_being)
  if (options.includes('OPPOSITE')) {
    if (confirm(`Roll=${roll}, take the opposite roll?`)) {
      store.dispatch({ type: 'TAKE_OPPOSITE' })
      return
    }
  }
  if (options.includes('ROLL_AGAIN')) {
    if (confirm(`Roll=${roll}, roll again?`)) {
      store.dispatch({ type: 'ROLL_DICE' })
    }
  }
  if (tenSpades(active)) {
    if (confirm(`Use 10-Spades to roll again?`)) {
      store.dispatch({ type: 'ROLL_DICE' })
      store.dispatch({ type: 'REMOVE_ACTIVE', card: '10S' })
    }
  }
  if (queenHearts(active)) {
    if (confirm(`Use Queen-Hearts to take the opposite?`)) {
      store.dispatch({ type: 'TAKE_OPPOSITE' })
      store.dispatch({ type: 'REMOVE_ACTIVE', card: 'QH' })
    }
  }
}

const handlePieces = (action) => {
  store.dispatch(action)
  const pieces = store.getState().cards.pieces
  store.dispatch({ type: 'MAKE_PIECES', pieces })
  store.dispatch({ type: 'CLEAR_PIECES' })
  // handle shocks
  store.getState().ep.shocks.forEach(shock => presentEvent(shock))
  store.dispatch({ type: 'CLEAR_SHOCKS' })
  // harnel-miaznel
  dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
  // handle new levels of being
  store.getState().ep.new_levels.forEach(level => presentEvent(level))
  store.dispatch({ type: 'CLEAR_NEW_LEVELS' })
}

const handleLawEvents = () => {
  store.dispatch({ type: 'OBEY_LAW' })
  for (let lawAction of store.getState().laws.actions) {
    store.dispatch(lawAction)
  }
  store.dispatch({ type: 'CLEAR_ACTIONS' })
  handleExtras()
}

// actions
const actions = {
  onRollClick: () => {
    const { position: position_before, death_turn } = store.getState().board
    if (death_turn) {
      dispatchWithExtras({ type: 'ROLL_AFTER_DEATH' })
    } else {
      store.dispatch({ type: 'ROLL_DICE' })
    }
    handleRollOptions()
    store.dispatch({ type: 'MOVE_ROLL' })
    const { position, spaces } = store.getState().board
    for (let s of spaces.substring(position_before+1, position)) {
      if (s==='L') {
        store.dispatch({ type: 'DRAW_LAW_CARD' })
        store.dispatch({ type: 'PASS_LAW' })
      }
    }
    switch(spaces[position]) {
      case 'F':
        dispatchWithExtras({ type: 'EAT_FOOD' })
        break;
      case 'A':
        dispatchWithExtras({ type: 'BREATHE_AIR' })
        break;
      case 'I':
        dispatchWithExtras({ type: 'TAKE_IMPRESSION' })
        break;
      case 'C':
        store.dispatch({ type: 'DRAW_CARD' })
        break;
      case 'L':
        store.dispatch({ type: 'DRAW_LAW_CARD' })
        store.dispatch({ type: 'MAGNETIC_CENTER_MOMENT' })
        break;
      case 'D':
      case '*':
      default:
    }
  },
  onDrawCard: () => store.dispatch({ type: 'DRAW_CARD' }),
  onDrawLawCard: () => store.dispatch({ type: 'DRAW_LAW_CARD' }),
  onSelectCard: (card) => store.dispatch({ type: 'SELECT_CARD', card }),
  onSelectLawCard: (card) => store.dispatch({ type: 'SELECT_LAW_CARD', card }),
  onSelectPart: (card) => store.dispatch({ type: 'SELECT_PART', card }),
  onPlaySelected: (cards, lawCards) => handlePieces({
    type: 'PLAY_SELECTED',
    cards,
    pieces: makeFaceCard(cards.concat(lawCards))
  }),
  onObeyLaw: handleLawEvents,
  onEatFood: () => dispatchWithExtras({ type: 'EAT_FOOD' }),
  onBreatheAir: () => dispatchWithExtras({ type: 'BREATHE_AIR' }),
  onTakeImpression: () => dispatchWithExtras({ type: 'TAKE_IMPRESSION' }),
  onSelfRemember: () => dispatchWithExtras({ type: 'SELF_REMEMBER' }),
  onTransformEmotions: () => dispatchWithExtras({ type: 'TRANSFORM_EMOTIONS' }),
  onCombineSelectedParts: (selected) => handlePieces({ type: 'COMBINE_PARTS', selected }),
  onAdvanceFoodDiagram: () => dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' }),
  onChangeBody: () => dispatchWithExtras({ type: 'CHANGE_BODY' }),
  onRandomLaw: () => {
    store.dispatch({ type: 'ROLL_DICE' })
    store.dispatch({ type: "ONE_BY_RANDOM", roll: store.getState().board.roll })
  },
  onChooseLaw: (card) => store.dispatch({ type: "ONE_BY_CHOICE", card }),
}

const ConsciousBoardgame = () => {
  const { board, cards, laws, fd, ep } = store.getState()

  return (
    <div>
      <Buttons
        actions={actions}
        roll={board.roll}
        cards={cards.hand}
        lawCards={laws.in_play}
        being={ep}
        death_turn={board.death_turn}
      />
      <TestButtons
        actions={actions}
        cards={cards.hand}
        lawCards={laws.in_play}
        parts={ep.parts}
      />
      <Board {...board} />
      <CardHand cards={cards.hand} onSelect={actions.onSelectCard} />
      <LawHand laws={laws} onSelect={actions.onSelectLawCard} onRandom={actions.onRandomLaw} onChoice={actions.onChooseLaw} />
      <FoodDiagram {...fd} store={store} />
      <ThreeBrains {...ep} onSelect={actions.onSelectPart} />
    </div>
  )
}

const render = () => {
  ReactDOM.render(
    <ConsciousBoardgame />,
    document.getElementById('Conscious-Boardgame')
  )
}

store.dispatch({ type: 'START_GAME' })
store.subscribe(render)

document.addEventListener('DOMContentLoaded', () => { render() })

export default ConsciousBoardgame
