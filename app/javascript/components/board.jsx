import React from 'react'
import ReactDOM from 'react-dom'

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
const split = (spaces, position) => ({
  before: spaces.slice(0, position),
  at: spaces.slice(position, position+1),
  after: spaces.slice(position+1, spaces.length),
})

const board = ({
  spaces,
  position,
}) => {
  const { before, at, after } = split(spaces, position)
  return (
    <div className="board-spaces">
      {before}
      <span style={{textDecoration: 'underline'}}>{at}</span>
      {after}
    </div>
  )
}

export default board
