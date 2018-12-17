const PARTS = [
  "AD","AC","AH","AS","XJ","JO",
  "JH","QH","KH","JS","QS","KS",
  "JD","QD","KD","JC","QC","KC",
]
const mapParts = (c) => {
  return { c, selected: false }
}
const threeBrains = (
  state = {
    parts: PARTS.map(mapParts),
    partsOfParts: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  },
  action
) => {
  switch(action.type) {
    case 'MAKE_FACE':
      break
    case 'MAKE_ACE':
      break
    case 'MAKE_XJ':
      break
    case 'MAKE_JO':
      break
    default:
      return state
  }
}
export default threeBrains
