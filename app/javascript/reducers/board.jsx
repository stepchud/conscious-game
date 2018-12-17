import { sixSides } from 'components/dice'
import { initialSpaces, convertToDeath } from 'components/board'

const board = (
  state = {
    roll: 0,
    position: 0,
    spaces: initialSpaces
  },
  action
) => {
  switch(action.type) {
    case 'ROLL_DICE':
      const roll = sixSides.roll()
      if (state.position + roll >= state.spaces.length) {
        return {
          roll,
          spaces: convertToDeath(state.spaces),
          position: 0
        }
      } else {
        return {
          ...state,
          position: state.position + roll,
          roll
        }
      }

    default:
      return state
  }
}

export default board
