const board = ( state = {}, action ) => {
  switch(action.type) {
    case 'ROLL_DICE':
      const roll = sixSides.roll()
      if (state.position + roll >= state.spaces.length) {
        return {
          roll,
          spaces: Board.convertToDeath(state.spaces),
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
