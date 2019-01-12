import { sum } from 'lodash'
import { makeFaceCard } from 'reducers/board'

const PARTS = [
  "JD","QD","KD","JC","QC","KC",
  "JH","QH","KH","JS","QS","KS",
  "AD","AC","AH","AS","XJ","JO",
]
const mapParts = (c) => ({ c, selected: false })
const shock = (index) =>
  (index < 12) ? 'SELF-REMEMBER' : (index < 16) ? 'TRANSFORM-EMOTIONS' : (index < 17) ? 'WILD-SHOCK' : 'ALL-SHOCKS'
const ep = (
  state = {
    parts: PARTS.map(mapParts),
    pieces: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    shocks: []
  },
  action
) => {
  const { parts, pieces, shocks } = state
  switch(action.type) {
    case 'SELECT_PART':
      parts[action.card].selected = !parts[action.card].selected
      return { parts, pieces, shocks }
    case 'MAKE_PIECES':
      let i = PARTS.indexOf(action.pieces[0])
      pieces[i] += action.pieces[1]
      shocks.push(shock(i))
      while (pieces[i]>2) {
        pieces[i] -= 2 // one goes up, one comes off
        i++
        pieces[i] += 1
        shocks.push(shock(i))
      }
      return { parts, pieces, shocks }
    case 'SHIFT_SHOCK':
      return { parts, pieces, shocks: shocks.slice(1) }
    default:
      return state
  }
}
export default ep
