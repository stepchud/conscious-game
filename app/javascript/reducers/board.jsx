import { map, filter, isEmpty, every, some, isNaN } from 'lodash'
import {
  INITIAL_SPACES,
  LAST_SPACE,
  TURNS,
  sixSides,
} from '../constants'

const convertToDeath = (spaces) => spaces.replace(/L/g, '*').replace(/C/g, 'D')

const InitialState = {
  dice: sixSides,
  roll: 0,
  position: 0,
  laws_passed: 2,
  laws_cancel: [],
  spaces: INITIAL_SPACES,
  death_space: LAST_SPACE,
  current_turn: TURNS.randomLaw,
  completed_trip: false,
}

const board = (
  state = InitialState,
  action
) => {
  const {
    roll,
    position,
    dice,
    death_space,
    laws_passed
  } = state
  switch(action.type) {
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
    case 'MOVE_ROLL': {
      const { current_turn } = state
      const { roll_multiplier } = action
      const new_position = position + (roll*roll_multiplier)  >= LAST_SPACE
        ? LAST_SPACE
        : position + (roll*roll_multiplier)
      const nextState = {
        ...state,
        position: new_position,
        current_turn: new_position >= death_space ? TURNS.death : current_turn,
        laws_cancel: [],
      }
      if (new_position > state.JD) {
        delete nextState.JD
        nextState.laws_cancel.push('JD')
      }
      if (new_position > state.JC) {
        delete nextState.JC
        nextState.laws_cancel.push('JC')
      }
      if (new_position > state.JH) {
        delete nextState.JH
        nextState.laws_cancel.push('JH')
      }

      return nextState
    }
    case 'PASS_LAW':
      return {
        ...state,
        laws_passed: laws_passed+1,
        current_turn: TURNS.randomLaw,
      }
    case 'MECHANICAL':
      const card = action.card
      return {
        ...state,
        [card]: position + action.for,
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
    case 'DEATH':
      return {
        ...state,
        current_turn: TURNS.death,
      }
    case 'END_DEATH': {
      const completed_trip = position == LAST_SPACE
      let spaces = state.spaces
      if (completed_trip) {
        spaces = [...spaces].reverse().join('')
      }
      if (!action.hasnamuss) {
        spaces = convertToDeath(spaces)
      }
      const nextState = {
        ...state,
        position: completed_trip ? 0 : position,
        current_turn: TURNS.normal,
        spaces,
        death_space: LAST_SPACE,
        completed_trip,
      }
      delete nextState.JD
      delete nextState.JC
      delete nextState.JH
      return nextState
    }
    default:
      return state
  }
}

export default board
