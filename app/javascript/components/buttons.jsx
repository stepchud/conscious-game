import React from 'react'
import { map } from 'lodash'

import { combinable, playable, selectedCards } from 'reducers/cards'
import { selectedLaws, selectedPlayedLaws, unobeyedLaws } from 'reducers/laws'
import { selectedParts } from 'reducers/being'
import { TURNS } from 'reducers/board'

const Buttons = ({
  actions,
  roll,
  being,
  cards,
  lawCards,
  currentTurn }) => {
  const selCards = selectedCards(cards)
  const selLaws = selectedLaws(lawCards)
  const selLawCards = map(selLaws, 'c.card')
  const selParts = selectedParts(being.parts)
  const cardsPlay =
    selCards.length <= being.card_plays &&
    playable(selCards.concat(selLawCards)) &&
    !selectedPlayedLaws(lawCards).length

  const buttons = []
  if (currentTurn===TURNS.randomLaw) {
    buttons.push(<button key={buttons.length} onClick={() => { actions.onRandomLaw() }}>One by random...</button>)
  } else if (currentTurn===TURNS.choiceLaw) {
    buttons.push(<span key={buttons.length}>Pick a law card:</span>)
  } else {
    if (unobeyedLaws(lawCards).length) {
      buttons.push(<span key={buttons.length}>* You simply must obey all of the laws in play</span>)
    } else if (currentTurn===TURNS.death) {
      buttons.push(<button key={buttons.length} onClick={actions.onEndDeath}>End Death</button>)
      buttons.push(<span key={buttons.length}>** Select up to 7 cards from your hand to keep first</span>)
    } else {
      buttons.push(<button key={buttons.length} onClick={actions.onRollClick}>Roll Dice</button>)
    }
    if (!being.sleep && !being.nopowers && being[combinable(selParts)]) {
      buttons.push(
        <button
          key={buttons.length}
          onClick={() => { actions.onCombineSelectedParts(selParts)} }>
          Combine Parts
        </button>
      )
    }
    if (!being.sleep && cardsPlay) {
      buttons.push(
        <button
          key={buttons.length}
          onClick={() => { actions.onPlaySelected(selCards, selLawCards)} }>
          Play Cards
        </button>
      )
    }
    if (selLaws.length===1 && !selLaws[0].obeyed) {
      buttons.push(<button key={buttons.length} onClick={actions.onObeyLaw}>Obey Law</button>)
    }
  }

  return (
    <div className="actions">
      <span className="dice">{roll}</span>
      {buttons}
    </div>
  )
}
export default Buttons
