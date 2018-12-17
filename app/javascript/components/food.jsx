import React from 'react'

import { spaces, s2, s3 } from './utils'

const handleExtra = (extra, dispatch) => {
  switch(extra) {
    case 'MENTAL-BODY':
      alert('You have a mental body')
      break
    case 'ASTRAL-BODY':
      alert('You have an astral body')
      break
    case 'EXTRA-IMPRESSION':
      if (confirm('Extra Impression: Draw a card?\nCancel to take it back in as Air.')) {
        dispatch({type: 'DRAW_CARD'})
      } else {
        dispatch({type: 'BREATHE_AIR'})
      }
      break
    case 'EXTRA-AIR':
      if (confirm('Extra Air: Draw a card?\nCancel to take it back in as Food.')) {
        dispatch({type: 'DRAW_CARD'})
      } else {
        dispatch({type: 'EAT_FOOD'})
      }
      break
    case 'EXTRA-FOOD':
      alert('Extra Food: Draw a card.')
      dispatch({type: 'DRAW_CARD'})
      break
    case 'C-12':
      alert('Carbon 12')
      dispatch({type: 'DRAW_CARD'})
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
        dispatch({type: 'EAT_WHEN_YOU_BREATHE'})
      } else {
        dispatch({type: 'LEAVE_MI_48'})
      }
      break
    case 'DO-48':
      if (confirm('Carbon-12?')) {
        dispatch({type: 'CARBON_12'})
      } else {
        dispatch({type: 'LEAVE_DO_48'})
      }
      break
    case 'SHOCKS-FOOD':
      dispatch({type: 'SHOCKS_FOOD'})
      break
    case 'SHOCKS-AIR':
      dispatch({type: 'SHOCKS_AIR'})
      break
    case 'RE-96':
      alert('No 24')
      break
    case 'FA-96':
      alert('No 24')
      break
    case 'MI-192':
      if (confirm('Breathe when you eat?')) {
        dispatch({type: 'BREATHE_WHEN_YOU_EAT'})
      } else {
        dispatch({type: 'LEAVE_MI_192'})
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

export const handleExtras = (store, action) => {
  store.dispatch(action)
  const extras = store.getState().fd.extras
  const dispatch = store.dispatch
  const dispatchExtra = (extra) => {
    return handleExtra(extra, dispatch)
  }
  if (extras.length) {
    extras.map(dispatchExtra)
    store.dispatch({type: 'CLEAR_EXTRAS'})
  }
}

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
