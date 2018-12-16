import React from 'react'

const spaces = (n) => '\u00A0'.repeat(n)
const two = spaces(2)
const three = spaces(3)

export default ({
  current,
  enter
}) => {
  const body = current.mental ? 'MENTAL-' : (current.astral ? 'ASTRAL-' : '')
  const bodySpace = spaces(body.length)
  return (
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
        {enter.food[0]}{two}{enter.food[1]}{two}{enter.food[2]}{three}
        {enter.food[3]}{two}{enter.food[4]}{three}{enter.food[5]}{two}
        {enter.food[6]}{three}
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
        {enter.air[0]}{three}{enter.air[1]}{two}
        {enter.air[2]}{three}
        {enter.air[3]}{two}{enter.air[4]}{three}
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
        {enter.impressions[0]}{three}
        {enter.impressions[1]}{two}{enter.impressions[2]}{three}
        {enter.impressions[3]}
      </h3>
    </pre>
  )
}
