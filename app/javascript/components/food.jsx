import React from 'react'

import { spaces, s2, s3 } from './utils'

const FoodDiagram = ({
  current,
  enter
}) => {
  const body = current.mental ? 'MENTAL-' : (current.astral ? 'ASTRAL-' : '')
  const bodySpace = spaces(body.length)
  return (
    <div>
      <pre>
        <h3>
          {body}FOOD:
          [{current.food[0]}][{current.food[1]}][{current.food[2]}]
          [{current.food[3]}][{current.food[4]}]
          [{current.food[5]}][{current.food[6]}]
          [{current.food[7]}]
          [{current.food[8]}]
        </h3>
        <h3>
          {bodySpace}{spaces(7)}
          {enter.food[0]}{s2}{enter.food[1]}{s2}{enter.food[2]}{s3}
          {enter.food[3]}{s2}{enter.food[4]}{s3}{enter.food[5]}{s2}
          {enter.food[6]}{s3}
          {enter.food[7]}
        </h3>

        <h3>
          {body}AIR:
          {spaces(8)}[{current.air[0]}]
          [{current.air[1]}][{current.air[2]}]
          [{current.air[3]}][{current.air[4]}]
          [{current.air[5]}]
          [{current.air[6]}]
        </h3>
        <h3>
          {bodySpace}{spaces(4)}{spaces(9)}
          {enter.air[0]}{s3}{enter.air[1]}{s2}
          {enter.air[2]}{s3}
          {enter.air[3]}{s2}{enter.air[4]}{s3}
          {enter.air[5]}
        </h3>
        <h3>
          {body}IMPRESSIONS:
          {spaces(7)}[{current.impressions[0]}]
          [{current.impressions[1]}][{current.impressions[2]}]
          [{current.impressions[3]}]
          [{current.impressions[4]}]
        </h3>
        <h3>
          {bodySpace}{spaces(5)}{spaces(15)}
          {enter.impressions[0]}{s3}
          {enter.impressions[1]}{s2}{enter.impressions[2]}{s3}
          {enter.impressions[3]}
        </h3>
      </pre>
    </div>
  )
}
export default FoodDiagram
