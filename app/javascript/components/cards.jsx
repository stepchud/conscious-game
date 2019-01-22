import React from 'react'
import { map, } from 'lodash'

export const Card = ({
  card,
  onClick
}) => {
  const classes = `card ${card.selected ? 'selected' : ''}`
  return <span className={classes} onClick={onClick}>
    {card.c}
  </span>
}

const LawCard = ({
  card,
  onClick
}) => {
  const classes = `card law ${card.selected ? 'selected' : ''}`
  return (
    <span title={card.c.text} className={classes} onClick={onClick}>
      {card.c.card}{card.obeyed && <sup>o</sup>}{card.played && <sup>p</sup>}
    </span>
  )
}

export const CardHand = ({
  cards,
  onSelect,
}) => {
  const hand = cards.length ? (
    map(cards, (c, i) => { return <Card key={i} card={c} onClick={() => onSelect(i)} /> })
  ) : (
    <span>No Cards.</span>
    )
  return (
    <div className="cards">
      {hand}
    </div>
  )
}

export const LawHand = ({
  cards,
  onSelect,
}) => {
  const hand = cards.length ? (
    map(cards, (c, i) => { return <LawCard key={i} card={c} onClick={() => onSelect(i)} /> })
  ) : (
    <span>No Laws.</span>
  )
  return (
    <div className="cards laws">
      {hand}
    </div>
  )
}

