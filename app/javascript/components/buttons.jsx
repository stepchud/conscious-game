import React from 'react'

const Buttons = ({ actions, roll, playable, newBody }) => {
  return (
    <div className="actions">
      <span className="dice">{roll}</span>
      <button onClick={actions.onRollClick}>Roll Dice</button>
      <button onClick={actions.onDrawCard}>Draw Card</button>
      <button onClick={actions.onEatFood}>Food</button>
      <button onClick={actions.onBreatheAir}>Air</button>
      <button onClick={actions.onTakeImpression}>Impression</button>
      <button onClick={actions.onSelfRemember}>Self-Remember</button>
      <button onClick={actions.onTransformEmotions}>Transform-Emotions</button>
      <button onClick={actions.onAdvanceFoodDiagram}>Digest Food</button>
      { playable &&
        <button onClick={actions.onPlaySelected}>Play Cards</button> }
      { newBody &&
        <button onClick={actions.onChangeBody}>Change Body</button> }
    </div>
  )
}
export default Buttons
