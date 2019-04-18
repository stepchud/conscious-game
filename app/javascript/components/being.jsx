import React from 'react'
import { pad, repeat, findIndex } from 'lodash'

import { spaces, s2, s3, clickOrReturn } from 'components/utils'
import { Card } from 'components/cards'

const ThreeBrains = ({
  parts,
  pieces,
  level_of_being,
  card_plays,
  transforms,
  wild_shock,
  all_shocks,
  onSelect,
}) => {
  const createCard = (c, i) => {
    const selected = parts ? findIndex(parts, (p) => p.c == c.c ) : i
    const onClick = (e) => clickOrReturn(e) && onSelect(selected)
    return <Card key={i} card={c} onClick={onClick} tabIndex='0' />
  }
  const mapPiece = (n) => `[${pad(repeat('*', n), 2)}]`
  return (
    <div>
      <div className="lob">
        Level: {level_of_being},
        Card plays: {card_plays},
        Transform: {transforms},
        Wild: {wild_shock},
        All: {all_shocks}
      </div>
      <div className="cards being">
        <pre>
          <h3>
            {parts.slice(12).map(createCard)}
          </h3>
          <h3>
            {pieces.slice(12).map(mapPiece)}
          </h3>
          <h3>
            {parts.slice(6, 12).map(createCard)}
          </h3>
          <h3>
            {pieces.slice(6, 12).map(mapPiece)}
          </h3>
          <h3>
            {parts.slice(0, 6).map(createCard)}
          </h3>
          <h3>
            {pieces.slice(0, 6).map(mapPiece)}
          </h3>
        </pre>
      </div>
    </div>
  )
}
export default ThreeBrains
