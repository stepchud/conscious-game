import React from 'react'
import { map, some } from 'lodash'

import { combinable, playable, selectedCards } from 'reducers/cards'
import { selectedLaws } from 'reducers/laws'
import { selectedParts } from 'reducers/being'

const Buttons = ({
  actions,
  roll,
  being,
  cards,
  lawCards,
  death_turn }) => {
  const selCards = selectedCards(cards)
  const selLaws = selectedLaws(lawCards)
  const selParts = selectedParts(being.parts)
  const cardsPlay = selCards.length <= being.card_plays &&
    playable(selCards.concat(selLaws)) &&
    !some(selLaws, 'played')
  return (
    <div className="actions">
      <span className="dice">{roll}</span>
      { death_turn ?
        <button onClick={actions.onFinishDeath}>Finish Death</button> :
        <button onClick={actions.onRollClick}>Roll Dice</button>
      }
      { being[combinable(selParts)] &&
        <button onClick={() => { actions.onCombineSelectedParts(selParts)} }>Combine Parts</button> }
      { cardsPlay &&
        <button onClick={() => { actions.onPlaySelected(selCards, selLaws)} }>Play Cards</button> }
      { selectedLaws(lawCards).length===1 &&
        <button onClick={actions.onObeyLaw}>Obey Law</button> }
    </div>
  )
}
export default Buttons
