import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore, combineReducers } from 'redux'

import { sixSides } from 'components/dice'
import * as Board from 'components/board'
import * as Deck from 'components/cards'
import FoodDiagram from 'components/food'
import cards, { playableCards } from 'reducers/cards'
import board from 'reducers/board'
import fd, { hasNewBody } from 'reducers/parts'

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
const game = combineReducers({ cards, board, fd })
const store = createStore(game, initialState)

const handleExtra = (extra) => {
  switch(extra) {
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
    case 'SHOCKS-FOOD':
      store.dispatch({type: 'SHOCKS_FOOD'})
      break
    case 'SHOCKS-AIR':
      store.dispatch({type: 'SHOCKS_AIR'})
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
    case 'NOTHING_TO_REMEMBER':
      alert('Nothing to Remember.')
      break
    default:
      console.warn(`handeExtra unknown extra: ${extra}`)
  }
}

const handleExtras = (action) => {
  store.dispatch(action)
  const extras = store.getState().fd.extras
  if (extras.length) {
    extras.map(handleExtra)
    store.dispatch({type: 'CLEAR_EXTRAS'})
  }
}

const onRollClick = () => store.dispatch({ type: 'ROLL_DICE' })
const onDrawCard = () => store.dispatch({ type: 'DRAW_CARD' })
const onSelectCard = (card) => store.dispatch({ type: 'SELECT_CARD', card: card })
const onPlaySelected = () => store.dispatch({ type: 'PLAY_SELECTED' })
const onDrawLawCard = () => store.dispatch({ type: 'DRAW_LAW_CARD' })
const onEatFood = () => handleExtras({ type: 'EAT_FOOD' })
const onBreatheAir = () => handleExtras({ type: 'BREATHE_AIR' })
const onTakeImpression = () => handleExtras({ type: 'TAKE_IMPRESSION' })
const onSelfRemember = () => handleExtras({ type: 'SELF_REMEMBER' })
const onTransformEmotions = () => handleExtras({ type: 'TRANSFORM_EMOTIONS' })
const onAdvanceFoodDiagram = () => handleExtras({ type: 'ADVANCE_FOOD_DIAGRAM' })
const onChangeBody = () => handleExtras({ type: 'CHANGE_BODY' })

const Card = ({
  card,
  onClick
}) => {
  const classes = `card ${card.selected && 'selected'}`
  return <span className={classes} onClick={onClick}>
    {card.c}
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
        const key = i++
        return <Card key={key} card={c} onClick={() => onSelectCard(key)} />
      })}
    </div>
  )
}
const ConsciousBoardgame = () => {
  const { cards, board, fd } = store.getState()
  return (
    <div>
      <div className="actions">
        <button onClick={onRollClick}>Roll Dice</button>
        <button onClick={onDrawCard}>Draw Card</button>
        <button onClick={onEatFood}>Food</button>
        <button onClick={onBreatheAir}>Air</button>
        <button onClick={onTakeImpression}>Impression</button>
        <button onClick={onSelfRemember}>Self-Remember</button>
        <button onClick={onTransformEmotions}>Transform-Emotions</button>
        <button onClick={onAdvanceFoodDiagram}>Digest Food</button>
        { playableCards(cards.hand) &&
          <button onClick={onPlaySelected}>Play Cards</button> }
        { hasNewBody(fd.current) &&
          <button onClick={onChangeBody}>Change Body</button> }
      </div>
      <BoardSpaces {...board} />
      <CardHand {...cards} />
      <FoodDiagram {...fd} />
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
