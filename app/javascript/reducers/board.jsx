import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

const STARTING_SPACES =
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'
const LAST_SPACE = STARTING_SPACES.length - 1
export const TURNS = {
  randomLaw: 'random',
  choiceLaw: 'choice',
  normal: 'normal',
  death: 'death',
}

export const Dice = (sides=10, zero=true) => {
  const basis = zero ? 0 : 1
  const roll = () => Math.floor(Math.random() * sides) + basis;
  const opposite = (value) => sides + basis - value;

  return { roll, opposite }
}
export const tenSides = Dice(10, true)
export const sixSides = Dice(6, false)

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
    death_space: LAST_SPACE,
    current_turn: TURNS.randomLaw,
    completed_trip: false,
  },
  action
) => {
  const { roll, position, dice, death_space } = state
  switch(action.type) {
    case 'ROLL_AFTER_DEATH':
    case 'ROLL_DICE':
      return {
        ...state,
        roll: dice.roll(),
      }
    case 'TAKE_OPPOSITE':
      return {
        ...state,
        roll: dice.opposite(roll)
      }
    case 'DEATH_SPACE':
      return {
        ...state,
        death_space: Math.min(death_space, position + action.in)
      }
    case 'MOVE_ROLL':
      const new_position = position + roll >= LAST_SPACE ? LAST_SPACE : position + roll
      if (state.current_turn===TURNS.death) {
        return {
          ...state,
          position: new_position == LAST_SPACE ? roll : new_position,
          completed_trip: new_position == LAST_SPACE,
          current_turn: TURNS.normal,
          death_space: LAST_SPACE
        }
      } else if (new_position >= death_space) {
        return {
          ...state,
          current_turn: TURNS.death,
          spaces: convertToDeath(state.spaces),
        }
      } else {
        return {
          ...state,
          position: position + roll,
        }
      }
    case 'PASS_LAW':
      const nextTurn = state.current_turn===TURNS.randomLaw ? TURNS.choiceLaw : TURNS.randomLaw
      return {
        ...state,
        current_turn: nextTurn,
      }
    case 'ONE_BY_RANDOM':
      return {
        ...state,
        current_turn: TURNS.choiceLaw,
      }
    case 'ONE_BY_CHOICE':
      return {
        ...state,
        current_turn: TURNS.normal,
      }
    default:
      return state
  }
}

export default board
