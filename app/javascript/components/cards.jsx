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
      {card.c.card}
      {card.obeyed && <sup>o</sup>}
      {card.played && <sup>p</sup>}
    </span>
  )
}

export const CardHand = ({
  cards,
  onSelect,
}) => {
  const hand = cards.length ? (
    map(cards, (c, i) => <Card key={i} card={c} onClick={() => onSelect(i)} />)
  ) : (
    <span>Empty Card Hand</span>
    )
  return (
    <div className="cards">
      {hand}
    </div>
  )
}

export const LawHand = ({
  laws,
  onSelect,
}) => {
  const activeLaws = (
    <div className="active laws">
      { laws.active.length ? (
          <strong>
            Active Laws:
            { map(laws.active, (c, i) => <LawCard key={i} card={c} onClick={() => {}} />) }
          </strong>
          ) : undefined
      }
    </div>
  )
  const hand = laws.hand.length ? (
    map(laws.hand, (c, i) => <LawCard key={i} card={c} onClick={() => onSelect(i)} />)
  ) : (
    <span>Empty Law Hand</span>
  )
  return (
    <div className="cards laws">
      {activeLaws}
      {hand}
    </div>
  )
}

