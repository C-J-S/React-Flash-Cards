export const createCard = (card) => {
  return {
    type: 'CREATE_CARD',
    payload: card
  };
};

export const deleteCard = (card) => {
  return {
    type: 'DELETE_CARD',
    payload: card
  };
};

export const editCard = (card) => {
  return {
    type: 'EDIT_CARD',
    payload: card
  };
}