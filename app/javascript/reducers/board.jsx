import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

import { initialSpaces, convertToDeath } from 'components/board'

const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1
  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}
const tenSides = Dice()
const sixSides = Dice(6, false)

const board = (
  state = {
    roll: 0,
    position: 0,
    spaces: initialSpaces,
  },
  action
) => {
  switch(action.type) {
    case 'ROLL_DICE':
      const roll = sixSides.roll()
      if (state.position + roll >= state.spaces.length) {
        return {
          ...state,
          roll,
          spaces: convertToDeath(state.spaces),
          position: 0
        }
      } else {
        return {
          ...state,
          roll,
          position: state.position + roll,
        }
      }
    default:
      return state
  }
}

export default board
