// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'
import { sixSides } from 'components/board'

const dice = (state = sixSides.roll(), action) => {
  console.log(`state: ${state}, action: ${action.type}`)
  switch(action.type) {
    case 'ROLL_DICE':
      return sixSides.roll()

    default:
      return state
  }
}

const store = createStore(dice)

const HelloDice = () => {
  return (
    <div>
      Dice: {store.getState()}
      <button onClick={() => store.dispatch({ type: 'ROLL_DICE' })}>Roll Dice</button>
    </div>
  )
}

HelloDice.defaultProps = {
}

HelloDice.propTypes = {
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
