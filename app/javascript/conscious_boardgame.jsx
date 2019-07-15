import React from 'react'
import ReactDOM from 'react-dom'
import { filter, map, includes } from 'lodash'

import Buttons from 'components/buttons'
import TestButtons from 'components/test_buttons'
import Board   from 'components/board'
import { CardHand, LawHand } from 'components/cards'
import FoodDiagram, { processExtra } from 'components/food'
import ThreeBrains from 'components/being'

import { TURNS } from './constants'
import store, { actions } from 'game'

const ConsciousBoardgame = () => {
  const { board, cards, laws, fd, ep } = store.getState()

  return (
    <div>
      <Buttons
        actions={actions}
        roll={board.roll}
        cards={cards.hand}
        laws={laws}
        ep={ep}
        currentTurn={board.current_turn}
      />
      {/*
      <TestButtons
        actions={actions}
        cards={cards.hand}
        laws={laws}
        parts={ep.parts}
      />
      */}
      <Board {...board} />
      <CardHand cards={cards.hand} onSelect={actions.onSelectCard} />
      { fd.current.alive && <LawHand
          laws={laws}
          byChoice={board.current_turn===TURNS.choiceLaw}
          onSelect={actions.onSelectLawCard}
          onChoice={actions.onChooseLaw} />
      }
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
