import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './DeckView.css';
import CardView from './CardView';
import ButtonFlat from './global/ButtonFlat';
import CardsGrid from './CardsGrid';

const DeckView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { cards, deck } = useSelector(state => {
    const cards = state.cards.filter(card => {
      return card.deckId === params.deckId
    });
    const deck = state.decks.filter(deck => {
      return deck.id === Number(params.deckId)
    })[0];
    return { cards, deck }
  });

  const navigateToCreateCards = () => {
    navigate(`/cards/create/${deck.id}`)
  }

  return (
    <div className="content-container">
      <div className="heading__container">
        <h3 className="deck-view__heading">Deck: {deck.name}</h3>
        <ButtonFlat 
          handleClick={navigateToCreateCards} 
          text="Create Cards"
          arrowDirection="right"
        />
      </div>
      {
        params.viewOption === 'edit' ? 
          <CardsGrid cards={cards} />
        : 
          <CardView cards={cards}/> 
      }
    </div>
  )
}

export default DeckView;