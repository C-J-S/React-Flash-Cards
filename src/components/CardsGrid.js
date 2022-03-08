import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './CardsGrid.css'
import CardsNavigation from './CardsNavigation';
import Modal from './global/Modal';
import { deleteCard } from '../actions/cardActions';

const CardsGrid = ({cards}) => {
  const [modalOpen, setModalOpen] = useState('')
  const [cardIndex, setCardIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const incrementIndex = () => {
    if(cardIndex < cards.length-1) setCardIndex(cardIndex + 1);
  }

  const decrementIndex = () => {
    if(cardIndex > 0) setCardIndex(cardIndex - 1);
  }

  const navigateToEditCard = () => {
    const { deckId, cardId } = cards[cardIndex];
    navigate(`/cards/edit/${deckId}/${cardId}`)
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const dispatchDeleteCard = (e) => {
    e.preventDefault();

    dispatch(deleteCard(cards[cardIndex]));
    closeModal();
    if(cardIndex === cards.length - 1) {
      setCardIndex(cardIndex - 1);
    }
  }

  return (
    cards.length ? 
    <>
      <div 
        className="grid"
      >
        <div className="grid__row heading" tabIndex="-1">
          <div className="grid__cell">
            <h4 className="grid__heading">Front</h4>
          </div>
          <div className="grid__cell">
            <h4 className="grid__heading">Back</h4>
          </div>
        </div>
          <div className="grid__row" tabIndex="-1">
            <div className="grid__cell">
              <p>{cards[cardIndex].front}</p>
            </div>
            <div className="grid__cell">
              <p>{cards[cardIndex].back}</p>
            </div>
            <div className="edit-menu" tabIndex="-1">
              <button
                onClick={navigateToEditCard}
              >Edit</button>
              <button
                onClick={openModal}
              >Delete</button>
            </div>
          </div>
      </div>
      <CardsNavigation
        handleForwardClick={incrementIndex}
        handleBackClick={decrementIndex}
        cardIndex={cardIndex}
        linkTo={`/deck/${cards[0].deckId}/study`}
        linkText="Study Deck"
      />
      {
        modalOpen ? 
        <Modal 
          handleSubmit={dispatchDeleteCard}
          handleModalClose={closeModal}
          buttonText="Delete Card"
          buttonDisabled={false}
          modalHeading="Delete Card?"
        />
        : null
      }
    </> 
    :
    <>
      <p className="user-message">No Cards in deck</p>
    </>
  )
}

export default CardsGrid;