export const createDeck = (deckName) => {
  return {
    type: 'CREATE_DECK',
    payload: deckName
  }
}

export const deleteDeck = (deckName) => {
  return {
    type: 'DELETE_DECK',
    payload: deckName
  }
}