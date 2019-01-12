import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore} from 'redux'

import Buttons from 'components/buttons'
import Board   from 'components/board'
import Hand    from 'components/cards'
import FoodDiagram, { processExtra } from 'components/food'
import ThreeBrains from 'components/being'

// reducers
import board, { selectedCards, playable } from 'reducers/board'
import fd,    { entering, hasNewBody } from 'reducers/parts'
import ep from 'reducers/being'


const game = combineReducers({ board, fd, ep })
const store = createStore(game)
const dispatchExtra = (extra) => processExtra(extra, store.dispatch)

const handleExtras = (action) => {
  store.dispatch(action)
  let extra = store.getState().fd.extras[0]
  while (extra) {
    dispatchExtra(extra)
    store.dispatch({ type: 'CLEAR_EXTRA', extra })
    extra = store.getState().fd.extras[0]
  }
  if (entering(store.getState().fd.enter)) {
    handleExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
  }
}

const handlePieces = (action) => {
  store.dispatch(action)
  const pieces = store.getState().board.pieces
  store.dispatch({ type: 'MAKE_PIECES', pieces })
  let shock = store.getState().ep.shocks[0]
  while (shock) {
    dispatchExtra(shock)
    store.dispatch({ type: 'SHIFT_SHOCK' })
    shock = store.getState().ep.shocks[0]
  }
  handleExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
  store.dispatch({ type: 'CLEAR_PIECES' })
}

// actions
const actions = {
  onRollClick: () => {
    store.dispatch({ type: 'ROLL_DICE' })
    const { position, spaces, } = store.getState().board
    switch(spaces[position]) {
      case 'F':
        handleExtras({ type: 'EAT_FOOD' })
        break;
      case 'A':
        handleExtras({ type: 'BREATHE_AIR' })
        break;
      case 'I':
        handleExtras({ type: 'TAKE_IMPRESSION' })
        break;
      case 'C':
        store.dispatch({ type: 'DRAW_CARD' })
        break;
      case 'L':
      case 'D':
      case '*':
      default:
    }
  },
  onDrawCard: () => store.dispatch({ type: 'DRAW_CARD' }),
  onSelectCard: (card) => store.dispatch({ type: 'SELECT_CARD', card }),
  onSelectPart: (card) => store.dispatch({ type: 'SELECT_PART', card }),
  onPlaySelected: () =>
    handlePieces({ type: 'PLAY_SELECTED', cards: selectedCards(store.getState().board.hand) }),
  onDrawLawCard: () => store.dispatch({ type: 'DRAW_LAW_CARD' }),
  onEatFood: () => handleExtras({ type: 'EAT_FOOD' }),
  onBreatheAir: () => handleExtras({ type: 'BREATHE_AIR' }),
  onTakeImpression: () => handleExtras({ type: 'TAKE_IMPRESSION' }),
  onSelfRemember: () => handleExtras({ type: 'SELF_REMEMBER' }),
  onTransformEmotions: () => handleExtras({ type: 'TRANSFORM_EMOTIONS' }),
  onAdvanceFoodDiagram: () => handleExtras({ type: 'ADVANCE_FOOD_DIAGRAM' }),
  onChangeBody: () => handleExtras({ type: 'CHANGE_BODY' }),
}

const ConsciousBoardgame = () => {
  const { board, fd, ep } = store.getState()
  return (
    <div>
      <Buttons
        actions={actions}
        roll={board.roll}
        playable={playable(selectedCards(board.hand))}
        newBody={hasNewBody(fd.current)}
      />
      <Board {...board} />
      <Hand cards={board.hand} onSelect={actions.onSelectCard} />
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
