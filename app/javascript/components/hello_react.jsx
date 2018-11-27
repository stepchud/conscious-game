// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, combineReducers } from 'redux'
import { sixSides, BoardSpaces } from 'components/board'
import { Deck } from 'components/cards'

const dice = sixSides
const boardSpaces = BoardSpaces()
const deck = Deck()
const cards = (
  state = {
    deck: deck.generateDeck(),
    discards: [],
    hand: []
  },
  action
) => {
  switch(action.type) {
    case 'DRAW_CARD':
      let nextDeck, nextDiscards
      if (_.isEmpty(state.deck)) {
        nextDeck = state.deck.shuffle(state.discards)
        nextDiscards = []
      } else {
        nextDeck = state.deck
        nextDiscards = state.discards
      }
      const card = nextDeck[0]
      return {
        deck: nextDeck.slice(1),
        discards: nextDiscards,
        hand: state.hand.concat(card)
      }
    case 'DISCARD':
      const pos = state.hand.indexOf(action.card)
      const nextHand = state.hand.slice(0, pos).concat(state.hand.slice(pos+1))
      console.log(`discard: ${action.card}, ${pos}, ${nextHand}`)
      return {
        deck: state.deck,
        discards: state.discards + action.card,
        hand: nextHand
      }
    default:
      return state
  }
}
const board = (
  state = {
    roll: dice.roll(),
    position: 0,
    spaces: boardSpaces.getSpaces()
  },
  action
) => {
  switch(action.type) {
    case 'ROLL_DICE':
      return {
        ...state,
        roll: action.roll,
        position: state.position + action.roll,
      }
    case 'DEATH':
      return {
        ...state,
        position: 0,
        spaces: action.spaces,
      }

    default:
      return state
  }
}

const game = combineReducers({ cards, board })
const store = createStore(game)

const onRollClick = (pos) => {
  const newRoll = sixSides.roll()
  if (pos + newRoll >= boardSpaces.getSpaces().length) {
    store.dispatch({ type: 'DEATH', spaces: boardSpaces.convertToDeath() })
  } else {
    store.dispatch({ type: 'ROLL_DICE', roll: newRoll })
    }
}
const onDrawCard = () => {
  store.dispatch({ type: 'DRAW_CARD' })
}
const onDiscard = (card) => {
  store.dispatch({ type: 'DISCARD', card: card })
}
const onDrawLawCard = () => {
  store.dispatch({ type: 'DRAW_LAW_CARD' })
}

const Card = ({
  card,
  onClick
}) => {
  return <div onClick={() => { onClick(card) }}>
    {card}
  </div>
}
const HelloDice = () => {
  const { cards, board } = store.getState()
  const { before, at, after } = boardSpaces.split(board.position)

  let i=0
  return (
    <div>
      <h2>Dice: {board.roll}</h2>
      <h2>Space: {boardSpaces.name(at)}</h2>
      <div className="cards">
        {_.map(cards.hand, (c) => {
          return <Card key={i++} card={c} onClick={() => onDiscard(c)} />
        })}
      </div>
      <div className="actions">
        <button onClick={() => { onRollClick(board.position) }}>Roll Dice</button>
        <button onClick={onDrawCard}>Draw Card</button>
      </div>
      <div className="board-spaces">
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
