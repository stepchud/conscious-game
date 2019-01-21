import React from 'react'
import { map } from 'lodash'

import { playable, selectedCards } from 'reducers/cards'

const Buttons = ({
  actions,
  roll,
  cards,
  lawCards,
  newBody }) => {
  const laws = map(lawCards, 'card')
  return (
    <div className="actions">
      <span className="dice">{roll}</span>
      <button onClick={actions.onRollClick}>Roll Dice</button>
      <button onClick={actions.onDrawCard}>Draw Card</button>
      <button onClick={actions.onDrawLawCard}>Draw Law Card</button>
      <button onClick={actions.onEatFood}>Food</button>
      <button onClick={actions.onBreatheAir}>Air</button>
      <button onClick={actions.onTakeImpression}>Impression</button>
      <button onClick={actions.onSelfRemember}>Self-Remember</button>
      <button onClick={actions.onTransformEmotions}>Transform-Emotions</button>
      <button onClick={actions.onAdvanceFoodDiagram}>Digest Food</button>
      { playable(selectedCards(cards.concat(laws))) &&
        <button onClick={actions.onPlaySelected}>Play Cards</button> }
        { selectedCards(laws).filter(c => !c.obeyed).length===1 &&
        <button onClick={actions.onObeyLaw}>Obey Law</button> }
      { newBody &&
        <button onClick={actions.onChangeBody}>Change Body</button> }
    </div>
  )
}
export default Buttons
