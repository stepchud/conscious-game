import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, combineReducers } from 'redux'
import { sixSides } from 'components/dice'
import * as Board from 'components/board'
import * as Deck from 'components/cards'
import { InitialState as InitialFoodDiagram } from 'components/parts'

const dice = sixSides
const cards = ( state = {}, action ) => {
  const {
    deck,
    discards,
    hand
  } = state
  switch(action.type) {
    case 'DRAW_CARD':
      let nextDeck, nextDiscards
      if (_.isEmpty(deck)) {
        nextDeck = Deck.shuffle(discards)
        nextDiscards = []
      } else {
        nextDeck = deck
        nextDiscards = discards
      }
      const card = nextDeck[0]
      return {
        deck: nextDeck.slice(1),
        discards: nextDiscards,
        hand: hand.concat(card)
      }
    case 'DISCARD':
      const pos = hand.indexOf(action.card)
      const nextHand = [
        ...hand.slice(0, pos),
        ...hand.slice(pos+1)
      ]
      console.log(`discard: ${action.card}, ${pos}, ${nextHand}`)
      return {
        deck: deck,
        discards: discards.concat(action.card),
        hand: nextHand
      }
    default:
      return state
  }
}
const board = ( state = {}, action ) => {
  switch(action.type) {
    case 'ROLL_DICE':
      const roll = sixSides.roll()
      if (state.position + roll >= state.spaces.length) {
        return {
          roll,
          spaces: Board.convertToDeath(state.spaces),
          position: 0
        }
      } else {
        return {
          ...state,
          position: state.position + roll,
          roll
        }
      }

    default:
      return state
  }
}

const initialState = {
  cards: {
    deck: Deck.generateDeck(),
    discards: [],
    hand: []
  },
  board: {
    roll: 0,
    position: 0,
    spaces: Board.initialSpaces
  },
  fd: InitialFoodDiagram,
}
const game = combineReducers({ cards, board })
const store = createStore(game, initialState)

const onRollClick = () => store.dispatch({ type: 'ROLL_DICE' })
const onDrawCard = () => store.dispatch({ type: 'DRAW_CARD' })
const onDiscard = (card) => store.dispatch({ type: 'DISCARD', card: card })
const onDrawLawCard = () => store.dispatch({ type: 'DRAW_LAW_CARD' })

const Card = ({
  card,
  onClick
}) => {
  return <span className="card" onClick={() => { onClick(card) }}>
    {card}
  </span>
}

const BoardSpaces = ({
  spaces,
  position,
  roll
}) => {
  const { before, at, after } = Board.split(spaces, position)
  return (
    <div className="board-spaces">
      {before}
      <span style={{textDecoration: 'underline'}}>{at}</span>
      {after}
      <h3>Roll: {roll}</h3>
    </div>
  )
}
const CardHand = ({
  hand,
}) => {
  let i=0
  return (
    <div className="cards">
      <h2>Card Hand:</h2>
      {_.map(hand, (c) => {
        return <Card key={i++} card={c} onClick={() => onDiscard(c)} />
      })}
    </div>
  )
}
const ConsciousBoardgame = () => {
  const { cards, board } = store.getState()
  return (
    <div>
      <div className="actions">
        <button onClick={onRollClick}>Roll Dice</button>
        <button onClick={onDrawCard}>Draw Card</button>
      </div>
      <BoardSpaces {...board} />
      <CardHand {...cards} />
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
