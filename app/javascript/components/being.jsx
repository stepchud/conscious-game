import React from 'react'
import { pad, repeat, findIndex } from 'lodash'

import { spaces, s2, s3 } from 'components/utils'
import { Card } from 'components/cards'

const ThreeBrains = ({
  parts,
  pieces,
  onSelect,
}) => {
  const createCard = (c, i) => {
    const selected = parts ? findIndex(parts, (p) => p.c == c.c ) : i
    return <Card key={i} card={c} onClick={() => onSelect(selected)} />
  }
  const mapPiece = (n) => `[${pad(repeat('*', n), 2)}]`
  return (
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
  )
}
export default ThreeBrains
