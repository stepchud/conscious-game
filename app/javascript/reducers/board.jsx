import { map, filter, isEmpty, every, some, isNaN } from 'lodash'

const STARTING_SPACES =
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'
const LAST_SPACE = STARTING_SPACES.length - 1
export const TURNS = {
  normal: 'normal',
  randomLaw: 'random',
  choiceLaw: 'choice',
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
    laws_passed: 2,
    spaces: STARTING_SPACES,
    death_space: LAST_SPACE,
    current_turn: TURNS.randomLaw,
    completed_trip: false,
  },
  action
) => {
  const { roll, position, dice, death_space, laws_passed } = state
  switch(action.type) {
    case 'ROLL_AFTER_DEATH':
    case 'ROLL_DICE':
      return {
        ...state,
        roll: dice.roll(),
      }
    case 'END_TURN':
      return {
        ...state,
        laws_passed: 0,
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
          regain: ['sleep', 'nopowers', 'noskills'],
          current_turn: TURNS.normal,
          death_space: LAST_SPACE
        }
      }
      const regain = []
      if (new_position > sleep_until) { regain.push('sleep') }
      if (new_position > nopowers_until) { regain.push('nopowers') }
      if (new_position > noskills_until) { regain.push('noskills') }
      if (new_position >= death_space) {
        return {
          ...state,
          regain,
          current_turn: TURNS.death,
          spaces: convertToDeath(state.spaces),
        }
      } else {
        return {
          ...state,
          regain,
          position: position + roll,
        }
      }
    case 'PASS_LAW':
      return {
        ...state,
        laws_passed: laws_passed+1,
        current_turn: TURNS.randomLaw,
      }
    case 'MECHANICAL':
      const lost_until = `${action.lost}_until`
      return {
        ...state,
        [lost_until]: position + action.for,
      }
    case 'ONE_BY_RANDOM':
      return {
        ...state,
        current_turn: laws_passed==2 ? TURNS.choiceLaw : TURNS.normal,
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
