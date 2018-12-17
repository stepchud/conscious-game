import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore} from 'redux'

import Buttons from 'components/buttons'
import Board   from 'components/board'
import Hand    from 'components/cards'
import FoodDiagram, { handleExtras } from 'components/food'
import ThreeBrains from 'components/being'

// reducers
import cards, { playableCards } from 'reducers/cards'
import fd,    { hasNewBody } from 'reducers/parts'
import board from 'reducers/board'
import ep from 'reducers/being'


const game = combineReducers({ cards, board, fd, ep })
const store = createStore(game)

// actions
const actions = {
  onRollClick: () => store.dispatch({ type: 'ROLL_DICE' }),
  onDrawCard: () => store.dispatch({ type: 'DRAW_CARD' }),
  onSelectCard: (card) => store.dispatch({ type: 'SELECT_CARD', card: card }),
  onPlaySelected: () => store.dispatch({ type: 'PLAY_SELECTED' }),
  onDrawLawCard: () => store.dispatch({ type: 'DRAW_LAW_CARD' }),
  onEatFood: () => handleExtras(store, { type: 'EAT_FOOD' }),
  onBreatheAir: () => handleExtras(store, { type: 'BREATHE_AIR' }),
  onTakeImpression: () => handleExtras(store, { type: 'TAKE_IMPRESSION' }),
  onSelfRemember: () => handleExtras(store, { type: 'SELF_REMEMBER' }),
  onTransformEmotions: () => handleExtras(store, { type: 'TRANSFORM_EMOTIONS' }),
  onAdvanceFoodDiagram: () => handleExtras(store, { type: 'ADVANCE_FOOD_DIAGRAM' }),
  onChangeBody: () => handleExtras(store, { type: 'CHANGE_BODY' }),
}

const ConsciousBoardgame = () => {
  const { cards, board, fd, ep } = store.getState()
  return (
    <div>
      <Buttons
        actions={actions}
        roll={board.roll}
        playable={playableCards(cards.hand)}
        newBody={hasNewBody(fd.current)}
      />
      <Board {...board} />
      <Hand cards={cards.hand} onSelect={actions.onSelectCard} />
      <FoodDiagram {...fd} store={store} />
      <ThreeBrains {...ep} />
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
