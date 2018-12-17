import React from 'react'

import { spaces, s2, s3 } from 'components/utils'
import { Card } from 'components/cards'

const createCard = (c, i) => <Card key={i} card={c} onClick={() => {}} />
const ThreeBrains = ({
  parts,
  partsOfParts,
}) => {
  return (
    <div className="cards being">
      <pre>
        <h3>
          {parts.slice(12).map(createCard)}
        </h3>
        <h3>
          [{s2}][{s2}][{s2}][{s2}][{s2}][{s2}]
        </h3>
        <h3>
          {parts.slice(6, 12).map(createCard)}
        </h3>
        <h3>
          [{s2}][{s2}][{s2}][{s2}][{s2}][{s2}]
        </h3>
        <h3>
          {parts.slice(0, 6).map(createCard)}
        </h3>
        <h3>
          [{s2}][{s2}][{s2}][{s2}][{s2}][{s2}]
        </h3>
      </pre>
    </div>
  )
}
export default ThreeBrains
