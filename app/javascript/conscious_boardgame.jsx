import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, combineReducers } from 'redux'
import { sixSides } from 'components/dice'
import * as Board from 'components/board'
import * as Deck from 'components/cards'
import cards from 'reducers/cards'
import board from 'reducers/board'
import foodDiagram from 'reducers/parts'

const dice = sixSides

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
}
const game = combineReducers({ cards, board, foodDiagram })
const store = createStore(game, initialState)

const onRollClick = () => store.dispatch({ type: 'ROLL_DICE' })
const onDrawCard = () => store.dispatch({ type: 'DRAW_CARD' })
const onDiscard = (card) => store.dispatch({ type: 'DISCARD', card: card })
const onDrawLawCard = () => store.dispatch({ type: 'DRAW_LAW_CARD' })
const onEatFood = () => store.dispatch({ type: 'EAT_FOOD' })
const onBreatheAir = () => store.dispatch({ type: 'BREATHE_AIR' })
const onTakeImpression = () => store.dispatch({ type: 'TAKE_IMPRESSION' })
const onSelfRemember = () => store.dispatch({ type: 'SELF_REMEMBER' })
const onTransformEmotions = () => store.dispatch({ type: 'TRANSFORM_EMOTIONS' })
const onAdvanceFoodDiagram = () => store.dispatch({ type: 'ADVANCE_FOOD_DIAGRAM' })

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
const FoodDiagram = ({
  current,
  enter
}) => {
  return (
    <pre>
      <h3>F:[{current.food[0]}][{current.food[1]}][{current.food[2]}][{current.food[3]}][{current.food[4]}][{current.food[5]}][{current.food[6]}][{current.food[7]}]</h3>
      <h3>---{enter.food[0]}--{enter.food[1]}--{enter.food[2]}--{enter.food[3]}--{enter.food[4]}--{enter.food[5]}--{enter.food[6]}--{enter.food[7]}--</h3>
      <h3>A:[X][X][{current.air[0]}][{current.air[1]}][{current.air[2]}][{current.air[3]}][{current.air[4]}][{current.air[5]}]</h3>
      <h3>---{enter.air[0]}--{enter.air[1]}--{enter.air[2]}--{enter.air[3]}--{enter.air[4]}--{enter.air[5]}--</h3>
      <h3>I:[X][X][X][X][{current.impressions[0]}][{current.impressions[1]}][{current.impressions[2]}][{current.impressions[3]}]</h3>
      <h3>---{enter.impressions[0]}--{enter.impressions[1]}--{enter.impressions[2]}--{enter.impressions[3]}--</h3>
    </pre>
  )
}
const ConsciousBoardgame = () => {
  const { cards, board, foodDiagram } = store.getState()
  return (
    <div>
      <div className="actions">
        <button onClick={onRollClick}>Roll Dice</button>
        <button onClick={onDrawCard}>Draw Card</button>
        <button onClick={onEatFood}>Food</button>
        <button onClick={onBreatheAir}>Air</button>
        <button onClick={onTakeImpression}>Impressions</button>
        <button onClick={onSelfRemember}>Self-Remember</button>
        <button onClick={onTransformEmotions}>Transform-Emotions</button>
        <button onClick={onAdvanceFoodDiagram}>Digest Food</button>
      </div>
      <BoardSpaces {...board} />
      <CardHand {...cards} />
      <FoodDiagram {...foodDiagram} />
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
