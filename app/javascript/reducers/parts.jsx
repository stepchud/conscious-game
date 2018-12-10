const InitialState = {
  current: {
    food:        [1,1,1,0,0,0,0,0,0],
    air:         [1,1,1,0,0,0,0],
    impressions: [1,0,0,0,0],
    astral: false,
    mental: false
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
    enter.food[8]++
    enter.food[7]--
  }
  if (enter.air[5]) {
    enter.air[6]++
    enter.air[5]--
  }
  if (enter.impressions[3]) {
    enter.impressions[4]++
    enter.impressions[3]--
  }

  // C-12 excess is higher-12
  if  (enter.food[6]) {
    enter.food[6]--
    extras.push('Carbon-12')
  }
  if (enter.impressions[2]) {
    enter.impressions[2]--
    extras.push('Carbon-12')
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
    enter.impressions[5]=0
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
  if (enter.air[2]) {
    extras.push("MI-48")
  }
  if (enter.impressions[0]) {
    extras.push("DO-48")
  }
  // C-96
  if (enter.air[1]) {
    if (has24(current)) {
      enter.air[2]=enter.air[1]
      extras.push("SHOCKS-FOOD")
    } else {
      extras.push("DO-96")
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
    extras.push("MI-192")
  }
  while (enter.air[0]) {
    if (has48(current)) {
      enter.air[1]=enter.air[0]
    } else {
      extras.push("DO-192");
    }
    enter.air[0]=0
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
  console.log(`FD: ${action.type}`)
  const {
    current,
    enter,
    extras
  } = state
  let nextState = state
  switch(action.type) {
    case "EAT_FOOD":
      enter.food[0]+=1
      nextState = enterNotes({ current, enter, extras })
      break
    case "BREATHE_AIR":
      enter.air[0]+=1
      nextState = enterNotes({ current, enter, extras })
      break
    case "TAKE_IMPRESSION":
      enter.impressions[0]+=1
      nextState = enterNotes({ current, enter, extras })
      break
    case "ADVANCE_FOOD_DIAGRAM":
      nextState = enterNotes({ current, enter, extras })
      break
    default:
      console.warn(`Unkown FoodDiagram Action: ${action.type}`)
      return state
  }

  return nextState
}

export default foodDiagram
