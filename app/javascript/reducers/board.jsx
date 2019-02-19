import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

const STARTING_SPACES =
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'


export const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1
  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}
const tenSides = Dice(10, true)
const sixSides = Dice(6, false)

const convertToDeath = (spaces) => {
  const deathSpaces = spaces.replace(/L/g, '*').replace(/C/g, 'D');
  return deathSpaces.split("").reverse().join("");
}

const board = (
  state = {
    dice: sixSides,
    roll: 0,
    position: 0,
    spaces: STARTING_SPACES,
  },
  action
) => {
  const { roll, position } = state
  switch(action.type) {
    case 'ROLL_DICE':
      return {
        ...state,
        roll: state.dice.roll(),
      }
    case 'TAKE_OPPOSITE':
      return {
        ...state,
        roll: state.dice.opposite(roll)
      }
    case 'MOVE_ROLL':
      if (position + roll >= state.spaces.length) {
        return {
          ...state,
          spaces: convertToDeath(state.spaces),
          position: 0
        }
      } else {
        return {
          ...state,
          position: position + roll,
        }
      }
    default:
      return state
  }
}

export default board
