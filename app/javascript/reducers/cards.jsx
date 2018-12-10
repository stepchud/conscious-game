const cards = ( state = {}, action ) => {
  const {
    deck,
    discards,
    hand
  } = state
  switch(action.type) {
    case 'DRAW_CARD':
      let nextDeck, nextDiscards
      if (_.isEmpty(deck)) {
        nextDeck = Deck.shuffle(discards)
        nextDiscards = []
      } else {
        nextDeck = deck
        nextDiscards = discards
      }
      const card = nextDeck[0]
      return {
        deck: nextDeck.slice(1),
        discards: nextDiscards,
        hand: hand.concat(card)
      }
    case 'DISCARD':
      const pos = hand.indexOf(action.card)
      const nextHand = [
        ...hand.slice(0, pos),
        ...hand.slice(pos+1)
      ]
      console.log(`discard: ${action.card}, ${pos}, ${nextHand}`)
      return {
        deck: deck,
        discards: discards.concat(action.card),
        hand: nextHand
      }
    default:
      return state
  }
}

export default cards
