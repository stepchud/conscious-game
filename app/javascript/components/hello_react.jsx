// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { sixSides, BoardSpaces } from 'components/board'

const dice = sixSides
const board = BoardSpaces()
const boardReduce = (state = {roll: dice.roll(), position: 0, spaces: board.getSpaces()}, action) => {
  switch(action.type) {
    case 'ROLL_DICE':
      return {
        roll: action.roll,
        position: state.position + action.roll,
        spaces: state.spaces,
      }
    case 'DEATH':
      return {
        roll: state.roll,
        position: 0,
        spaces: action.spaces,
      }

    default:
      return state
  }
}

const store = createStore(boardReduce)

const HelloDice = () => {
  const roll = store.getState().roll
  const position = store.getState().position
  const onRollClick = () => {
    const newRoll = sixSides.roll()
    if (position + newRoll >= board.getSpaces().length) {
      console.log("DIED")
      store.dispatch({ type: 'DEATH', spaces: board.convertToDeath() })
    } else {
      store.dispatch({ type: 'ROLL_DICE', roll: newRoll })
      }
  }
  const { before, at, after } = board.split(position)

  return (
    <div>
      <h2>Dice: {roll}</h2>
      <h2>Space: {board.name(at)}</h2>
      <button onClick={onRollClick}>Roll Dice</button>
      <div>
        {before}
        <span style={{textDecoration: 'underline'}}>{at}</span>
        {after}
      </div>
    </div>
  )
}

const render = () => {
  ReactDOM.render(
    <HelloDice />,
    document.getElementById('hello-react')
  )
}

store.subscribe(render)

document.addEventListener('DOMContentLoaded', () => { render() })

export default HelloDice
