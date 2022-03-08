import { combineReducers } from "redux";
import { generateRandomNumber } from '../utils';

const initialCardsState = () => {
  const data = localStorage.getItem('cards');
  return data ? JSON.parse(data) : [];
}

const cardsReducer = (state=initialCardsState(), action) => {
  switch(action.type) {
    case 'CREATE_CARD':
      return [...state, action.payload];
    case 'DELETE_CARD':
      return state.filter(card => card.cardId !== action.payload.cardId);
    case 'EDIT_CARD':
      const { cardId } = action.payload;
      const index = state.findIndex(card => card.cardId === cardId);
      state.splice(index, 1, action.payload)
      return [...state]
    default:
      return state;
  }
}

const navReducer = (state=false, action) => {
  switch(action.type) {
    case 'OPEN_NAV':
      return true;
    case 'CLOSE_NAV':
      return false;
    default:
      return state;
  }
}

const initialDecksState = () => {
  const data = localStorage.getItem('decks');
  return data ? JSON.parse(data) : [];
}

const decksReducer = (state=initialDecksState(), action) => {
  switch(action.type) {
    case 'CREATE_DECK':
      return [...state, {
        name: action.payload, 
        id: generateRandomNumber()
      }];
    case 'DELETE_DECK':
      return state.filter(deck => deck.id !== action.payload);
    default:
      return state;
  }
}

export default combineReducers({
  cards: cardsReducer,
  nav: navReducer,
  decks: decksReducer
});

