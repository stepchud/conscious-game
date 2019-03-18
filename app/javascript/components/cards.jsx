import React from 'react'
import { map, } from 'lodash'

import { lawAtIndex } from 'reducers/laws'

export const Card = ({
  card,
  onClick,
}) => {
  const classes = `card ${card.selected ? 'selected' : ''}`
  return <span className={classes} onClick={onClick} onKeyDown={onClick} tabIndex='0'>
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
    <span title={card.c.text} className={classes} onClick={onClick} tabIndex='0'>
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
    map(cards, (c, i) => <Card key={i} card={c} onClick={() => onSelect(i)} tabIndex='0' />)
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
  onRandom,
  onChoice,
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
  let pickLaw
  if (laws.by_random) {
    pickLaw = <button onClick={() => { onRandom() }}>One by random...</button>
  } else if (laws.by_choice) {
    pickLaw = <span>One by choice, pick: </span>
  } else {
    pickLaw = <span>Law hand:</span>
  }

  const hand = laws.hand.length ? (
    map(laws.hand, (c, i) =>
      <LawCard key={i} card={c} onClick={() => laws.by_choice && onChoice(i)} />
    )
  ) : (
    <span>Empty Law Hand</span>
  )

  return (
    <div className="cards laws">
      <div className="active laws">
        {activeLaws}
      </div>
      <div className="lawhand">
        {pickLaw}{hand}
      </div>
      <div className="inplay laws">
        {!!laws.in_play.length && <span>In play:</span>}
        {!!laws.in_play.length && map(laws.in_play, (c, i) =>
          <LawCard key={i} card={c} onClick={() => onSelect(i)} tabIndex='0' />
        )}
      </div>
    </div>
  )
}

