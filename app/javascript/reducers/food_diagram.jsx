import { identity, findIndex, findLastIndex } from 'lodash'

const InitialState = {
  current: {
    food:        [1,1,1,0,0,0,0,0,0],
    air:         [1,1,1,0,0,0,0],
    impressions: [1,0,0,0,0],
    alive:  true,
    astral: false,
    mental: false,
  },
  enter: {
    food:        [0,0,0,0,0,0,0,0],
    air:         [0,0,0,0,0,0],
    impressions: [0,0,0,0]
  },
  extras: []
}

const has6   = (fd) => (fd.food[7] || fd.air[5] || fd.impressions[3])
const has12  = (fd) => (fd.food[6] || fd.air[4] || fd.impressions[2])
const has24  = (fd) => (fd.food[5] || fd.air[3] || fd.impressions[1])
const has48  = (fd) => (fd.food[4] || fd.air[2] || fd.impressions[0])
const has96  = (fd) => (fd.food[3] || fd.air[1])
const has192 = (fd) => (fd.food[2] || fd.air[0])

const noteIndex = (note, current) => {
  let octave, index
  switch(note) {
    case 'DO-768':
      return ['food', 0]
    case 'RE-384':
      return ['food', 1]
    case 'MI-192':
      return ['food', 2]
    case 'FA-96':
      return ['food', 3]
    case 'SO-48':
      return ['food', 4]
    case 'LA-24':
      return ['food', 5]
    case 'TI-12':
      return ['food', 6]
    case 'DO-6':
      return ['food', 7]
    case 'DO-192':
      return ['air', 0]
    case 'RE-96':
      return ['air', 1]
    case 'MI-48':
      return ['air', 2]
    case 'FA-24':
      return ['air', 3]
    case 'SO-12':
      return ['air', 4]
    case 'LA-6':
      return ['air', 5]
    case 'DO-48':
      return ['impressions', 0]
    case 'RE-24':
      return ['impressions', 1]
    case 'MI-12':
      return ['impressions', 2]
    case 'FA-6':
      return ['impressions', 3]
    case 'HIGHEST-IMPRESSION':
      const hImp = findLastIndex(current.impressions, identity, 2)
      return ['impressions', hImp]
    case 'LOWEST-IMPRESSION':
      const lImp = findIndex(current.impressions, identity)
      return ['impressions', lImp]
    case 'HIGHEST-AIR':
      const hAir = findLastIndex(current.air, identity, 4)
      return ['air', hAir]
    case 'HIGHEST-FOOD':
      const hFood = findLastIndex(current.food, identity, 6)
      return ['food', hFood]
    default:
      throw `Unexpected note ${note}`
  }
  return [octave, index]
}

const hasNewBody = (fd) => {
  let xFood = fd.food[8]
  let xAir = fd.air[6]
  let xImpressions = fd.impressions[4]
  if (fd.alive) {
    return fd.astral ?
      (xFood >= 11 && xAir >= 9 && xImpressions >= 5) :
      (xFood >= 3 && xAir >= 3 && xImpressions >= 1)
  } else {
    xFood>=3 && xAir>=3 && xImpressions>=1
  }
}

export const survivesDeath = (fd, completed_trip) =>
  fd.mental || (fd.astral && (fd.alive || !completed_trip))

export const entering = (enter) =>
  _.some([...enter.food, ...enter.air, ...enter.impressions])

// entering notes move one step of harnel-miaznel
const enterNotes = ({ current, enter, extras }) => {
  // place empty notes, order doesn't matter here
  _.each(enter.food, (n,i) => {
    if (n && !current.food[i]) {
      current.food[i]++
      enter.food[i]--
    }
  });
  _.each(enter.air, (n,i) => {
    if (n && !current.air[i]) {
      current.air[i]++
      enter.air[i]--
    }
  });
  _.each(enter.impressions, (n,i) => {
    if (n && !current.impressions[i]) {
      current.impressions[i]++
      enter.impressions[i]--
    }
  });

  // C-6 excess becomes new body chip
  if (enter.food[7]) {
    current.food[8]++
    enter.food[7]--
  }
  if (enter.air[5]) {
    current.air[6]++
    enter.air[5]--
  }
  if (enter.impressions[3]) {
    current.impressions[4]++
    enter.impressions[3]--
  }

  // handle new chips
  if (hasNewBody(current)) {
    if (current.mental) {
      // NO-OP: extra mental body
    } else if (current.astral) {
      extras.push('MENTAL-BODY')
      current.mental = true
    } else {
      extras.push('ASTRAL-BODY')
      current.astral = true
    }
  } else if (!current.astral && current.food[8]>3) {
    while(current.food[8]>3) {
      extras.push('EXTRA-FOOD')
      current.food[8]--
    }
  } else if (!current.astral && current.air[6]>3) {
    while(current.air[6]>3) {
      extras.push('EXTRA-AIR')
      current.air[6]--
    }
  } else if (!current.astral && current.impressions[4]>1) {
    while(current.impressions[4]>1) {
      extras.push('EXTRA-IMPRESSION')
      current.impressions[4]--
    }
  }

  // C-12 excess is higher-12
  if  (enter.food[6]) {
    enter.food[6]--
    if (current.food[6]<3) {
      current.food[6]++
    } else {
      extras.push('C-12')
    }
  }
  if (enter.impressions[2]) {
    enter.impressions[2]--
    if (current.impressions[2]<3) {
      current.impressions[2]++
    } else {
      extras.push('C-12')
    }
  }
  // extra SO-12 rises
  if (enter.air[4]) {
    enter.air[5]=enter.air[4]
    enter.air[4]=0
  }
  // C-24
  if (enter.food[5]) {
    if (has6(current)) {
      enter.food[6]=enter.food[5]
    } else {
      extras.push("LA-24")
    }
    enter.food[5]=0
  }
  if (enter.impressions[1]) {
    if (has6(current)) {
      enter.impressions[2]=enter.impressions[1]
    } else {
      extras.push("RE-24")
    }
    enter.impressions[1]=0
  }
  if (enter.air[3]) {
      // don't care about H-6 for air octave
      enter.air[4]=enter.air[3]
      enter.air[3]=0
  }
  // C-48
  if (enter.food[4]) {
    if (has12(current)) {
      enter.food[5]=enter.food[4]
    } else {
      extras.push("SO-48")
    }
    enter.food[4]=0
  }
  while (enter.air[2]) {
    enter.air[2]--
    extras.push("MI-48")
  }
  while (enter.impressions[0]) {
    enter.impressions[0]--
    extras.push("DO-48")
  }
  // C-96
  if (enter.air[1]) {
    if (has24(current)) {
      enter.air[2]=enter.air[1]
    } else {
      extras.push("RE-96")
    }
    enter.air[1]=0;
  }
  while (enter.food[3]) {
    if (has24(current)) {
      enter.food[4]++
    } else {
      extras.push("FA-96")
    }
    enter.food[3]--
  }
  // C-192
  while (enter.food[2]) {
    enter.food[2]--
    extras.push("MI-192")
  }
  while (enter.air[0]) {
    if (has48(current)) {
      enter.air[1]++
      extras.push("SHOCKS-FOOD")
    } else {
      extras.push("DO-192");
    }
    enter.air[0]--
  }
  // C-384
  if (enter.food[1]) {
    if (has96(current)) {
      enter.food[2]=enter.food[1];
    } else {
      extras.push("RE-384")
    }
    enter.food[1]=0;
  }
  // C-768
  if (enter.food[0]) {
    if (has192(current)) {
      enter.food[1]=enter.food[0];
    } else {
      extras.push("DO-768")
    }
    enter.food[0]=0;
  }

  return { current, enter, extras }
}

const foodDiagram = (
  state = InitialState,
  action
) => {
  const {
    current,
    enter,
    extras
  } = state
  let nextState = state
  switch(action.type) {
    case "ADVANCE_FOOD_DIAGRAM":
      return enterNotes({ current, enter, extras })
    case "EAT_FOOD":
      enter.food[0]+=1
      return enterNotes({ current, enter, extras })
    case "BREATHE_AIR":
      enter.air[0]+=1
      return enterNotes({ current, enter, extras })
    case "TAKE_IMPRESSION":
      enter.impressions[0]+=1
      return enterNotes({ current, enter, extras })
    case "SHOCKS_FOOD":
      if (current.food[2]) {
        enter.food[3]++
        current.food[2]--
      }
      return { current, enter, extras }
    case "SHOCKS_AIR":
      if (current.air[2]) {
        enter.air[3]++
        current.air[2]--
      }
      return { current, enter, extras }
    case "BREATHE_WHEN_YOU_EAT":
      return {
        current,
        enter: {
          ...enter,
          food: [
            ...enter.food.slice(0,3),
            enter.food[3]+1,
            ...enter.food.slice(4)
          ],
        },
        extras
      }
    case "EAT_WHEN_YOU_BREATHE":
      return {
        current,
        enter: {
          ...enter,
          air: [
            ...enter.air.slice(0,3),
            enter.air[3]+1,
            ...enter.air.slice(4)
          ],
        },
        extras
      }
    case "CARBON_12":
      enter.impressions[1]++
      if (current.air[2]) {
        enter.air[3]++
        current.air[2]--
      }
      return { current, enter, extras }
    case "SELF_REMEMBER":
      if (current.impressions[0]>0) {
        current.impressions[0]--
        enter.impressions[1]++
        extras.push('SHOCKS-AIR')
      } else {
        extras.push("NOTHING-TO-REMEMBER")
      }
      return { current, enter, extras }
    case "TRANSFORM_EMOTIONS":
      if (current.impressions[2]>0) {
        current.impressions[2]--
        enter.impressions[3]++
      }
      if (current.food[6]>0) {
        current.food[6]--
        enter.food[7]++
      }
      return { current, enter, extras }
    case "LEAVE_MI_48":
      if (current.air[2]==3) {
        extras.push("HYPERVENTILATE")
      } else {
        current.air[2]+=1
      }
      return { current, enter, extras }
    case "LEAVE_DO_48":
      if (current.impressions[0]==3) {
        extras.push("VOID")
      } else {
        current.impressions[0]+=1
      }
      return { current, enter, extras }
    case "LEAVE_MI_192":
      if (current.food[2]==3) {
        extras.push("BURP")
      } else {
        current.food[2]+=1
      }
      return { current, enter, extras }
    case 'ADD_NOTES':
      _.each(action.notes, (note) => {
        const [octave, index] = noteIndex(note, current)
        if (current[octave][index] == 0 ||
            (octave=='food' && [0,2,3,6,7].includes(index)) ||
            (octave=='air' && [0,2,3,5].includes(index)) ||
            (octave=='impressions')
           ) {
          enter[octave][index] += 1
          if (index==1) {
            if (octave=='air') {
              extras.push('SHOCKS-FOOD')
            } else if (octave=='impressions') {
              extras.push('SHOCKS-AIR')
            }
          }
        }
      })
      return { current, enter, extras }
    case 'TAKE_NOTES': {
      _.each(action.notes, (note) => {
        const [octave, index] = noteIndex(note, current)
        current[octave][index] = 0
      })
      return { current, enter, extras }
    }
    case 'DECAY_NOTE': {
      const [octave, index] = noteIndex(action.note, current)
      current[octave][index]--
      return { current, enter, extras }
    }
    case 'TRANSFORM_MI_TI_12_TO_6':
      enter.impressions[3] = current.impressions[2]
      current.impressions[2] = 0
      const [octave, index] = noteIndex('HIGHEST-FOOD', current)
      enter.food[7] = current.food[index]
      current.food[index] = 0
      return { current, enter, extras }
    case 'SHOCK_MI48_LA6':
      if (current.air[2]) {
        enter.air[5] += current.air[2]
        current.air[2] = 0
      } else {
        enter.air[2] += 1
      }
      return { current, enter, extras }
    case 'SHOCK_MI_192_TI_12':
      if (current.food[2]) {
        enter.food[6] += current.food[2]
        current.food[2] = 0
      } else {
        enter.food[2] += 1
      }
      return { current, enter, extras }
    case 'CLEAR_EXTRAS':
      return { current, enter, extras: [] }
    case 'CHANGE_BODY':
      let newFood = current.food[8]
      let newAir = current.air[6]
      let newImpressions = current.impressions[4]
      current.food = new Array(9).fill(0)
      current.air = new Array(7).fill(0)
      current.impressions = new Array(5).fill(0)
      if (newFood >= 11 && newAir >= 9 && newImpressions >= 5 && !current.astral) {
        // already have a mental body, go straight to that
        newFood -= 8
        newAir -= 6
        newImpressions -= 4
        current.astral = true
        current.mental = true
      } else if (current.astral) {
        current.mental = true
      } else {
        current.astral = true
      }
      for (let i=0; i < 9; i++) {
        if (newFood) {
          current.food[i] = 1
          newFood--
        }
        if (newAir) {
          current.air[i] = 1
          newAir--
        }
        if (newImpressions) {
          current.impressions[i] = 1
          newImpressions--
        }
      }
      return { current, enter, extras }
    case 'END_DEATH':
      current.alive = false
      return { current, enter, extras }
    default:
      return state
  }
}

export default foodDiagram
