import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore} from 'redux'
import { filter, map, includes } from 'lodash'

import Buttons from 'components/buttons'
import Board   from 'components/board'
import { CardHand, LawHand } from 'components/cards'
import FoodDiagram, { processExtra } from 'components/food'
import ThreeBrains from 'components/being'

// reducers
import board from 'reducers/board'
import cards, { sameSuit } from 'reducers/cards'
import laws  from 'reducers/laws'
import fd, { entering, hasNewBody } from 'reducers/food_diagram'
import ep from 'reducers/being'

const game = combineReducers({ board, cards, laws, fd, ep })
const store = createStore(game)

const presentEvent = (event) => {
  switch(event) {
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
      if (confirm('Eat when you breathe?')) {
        store.dispatch({type: 'EAT_WHEN_YOU_BREATHE'})
      } else {
        store.dispatch({type: 'LEAVE_MI_48'})
      }
      break
    case 'DO-48':
      if (confirm('Carbon-12?')) {
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
      if (confirm('Breathe when you eat?')) {
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
  let extra = store.getState().fd.extras[0]
  while (extra) {
    presentEvent(extra)
    store.dispatch({ type: 'SHIFT_EXTRA' })
    extra = store.getState().fd.extras[0]
  }
  if (entering(store.getState().fd.enter)) {
    dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
  }
}

const dispatchWithExtras = (action) => {
  store.dispatch(action)
  handleExtras()
}

const handlePieces = (action) => {
  store.dispatch(action)
  const pieces = store.getState().cards.pieces
  store.dispatch({ type: 'MAKE_PIECES', pieces })
  store.dispatch({ type: 'CLEAR_PIECES' })
  let shock = store.getState().ep.shocks[0]
  while (shock) {
    presentEvent(shock)
    store.dispatch({ type: 'SHIFT_SHOCK' })
    shock = store.getState().ep.shocks[0]
  }
  dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
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
    const before = store.getState().board.position
    store.dispatch({ type: 'ROLL_DICE' })
    const { position, spaces } = store.getState().board
    for (let s of spaces.substring(before+1, position)) {
      if (s==='L') {
        console.log("passed a law")
        store.dispatch({ type: 'DRAW_LAW_CARD' })
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
  onPlaySelected: () => {
    const hand = store.getState().cards.hand
    const lawHand = store.getState().laws.hand
    if (filter(lawHand, (l) => l.played && l.selected).length) { return }
    handlePieces({ type: 'PLAY_SELECTED', hand, lawHand })
  },
  onObeyLaw: handleLawEvents,
  onEatFood: () => dispatchWithExtras({ type: 'EAT_FOOD' }),
  onBreatheAir: () => dispatchWithExtras({ type: 'BREATHE_AIR' }),
  onTakeImpression: () => dispatchWithExtras({ type: 'TAKE_IMPRESSION' }),
  onSelfRemember: () => dispatchWithExtras({ type: 'SELF_REMEMBER' }),
  onTransformEmotions: () => dispatchWithExtras({ type: 'TRANSFORM_EMOTIONS' }),
  onAdvanceFoodDiagram: () => dispatchWithExtras({ type: 'ADVANCE_FOOD_DIAGRAM' }),
  onChangeBody: () => dispatchWithExtras({ type: 'CHANGE_BODY' }),
}

const ConsciousBoardgame = () => {
  const { board, cards, laws, fd, ep } = store.getState()
  return (
    <div>
      <Buttons
        actions={actions}
        roll={board.roll}
        cards={cards.hand}
        lawCards={laws.hand}
        newBody={hasNewBody(fd.current)}
      />
      <Board {...board} />
      <CardHand cards={cards.hand} onSelect={actions.onSelectCard} />
      <LawHand cards={laws.hand} onSelect={actions.onSelectLawCard} />
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

store.subscribe(render)

document.addEventListener('DOMContentLoaded', () => { render() })

export default ConsciousBoardgame
