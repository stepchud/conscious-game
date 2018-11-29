export const initialSpaces =
  '*AFAIFCACFFCIAACFFICAFACCFICFAAFCCLAFICCFAFICAFCC' +
  'IAACFFICAICAFFICCAAIFCLLCFFIAAICCFIACIFACIAFICAIL' +
  'FCAACICCFAICFFACICAIFCCFICACFALLCCFACCCFICFCAICCI' +
  'AFFICAALCCIFACCCIFICAACCICFFCCIAFCCALLCCCAFFACIAF' +
  'CCIACFACILCAFFCCAIAFCCIACFFICCCAICCFCALLCCAAFCIC*'

const spaceMap = {
  '*': 'Wild',
  'F': 'Food',
  'A': 'Air',
  'I': 'Impression',
  'C': 'Card',
  'L': 'Law',
  'D': 'Decay',
}
const name = (letter) => spaceMap[letter]
const before = (spaces, position) => spaces.slice(0, position)
const at = (spaces, position) => spaces.slice(position, position+1)
const after = (spaces, position) => spaces.slice(position+1, spaces.length)

export const split = (spaces, position) => ({
  before: before(spaces, position),
  at: at(spaces, position),
  after: after(spaces, position)
})

export const convertToDeath = (spaces) => {
  const deathSpaces = spaces.replace(/L/g, '*').replace(/C/g, 'D');
  return deathSpaces.split("").reverse().join("");
}
