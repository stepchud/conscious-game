import React from 'react'
import { map, } from 'lodash'

import { lawAtIndex } from 'reducers/laws'

export const Card = ({
  card,
  onClick
}) => {
  const classes = `card ${card.selected ? 'selected' : ''}`
  return <span className={classes} onClick={onClick}>
    {card.c}
  </span>
}

const ActiveLawCard = ({
  card,
  covered,
}) => {
  return (
    <span title={card.text} className='card law'>
      {card.card}{covered && '*'}
    </span>
  )
}

const LawCard = ({
  card,
  onClick
}) => {
  const classes = `card law ${card.selected ? 'selected' : ''}`
  return (
    <span title={card.c.text} className={classes} onClick={onClick}>
      {card.c.card}
      <sup>
        {card.obeyed ? 'o' : '\u00A0'}
        {card.played ? 'p' : '\u00A0'}
      </sup>
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
  let activeLaws
  if (laws.active.length) {
    const lawCards = map(
      laws.active,
      (c, i) => <ActiveLawCard key={i} card={lawAtIndex(c)} covered={c.protected} />
    )
    activeLaws = (
      <div className="active laws">
        <strong>Active Laws: { lawCards }</strong>
      </div>
    )
  }
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

