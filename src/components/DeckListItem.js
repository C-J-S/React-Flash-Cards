import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import './DeckListItem.css';
import Modal from './global/Modal';
import { deleteDeck } from '../actions/deckActions';

export const DeckListItem = ({deck}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  }

  const navigateToDeckStudy = () => {
    navigate(`/deck/${deck.id}/study`)
  }

  const navigateToDeckEdit = (e) => {
    e.stopPropagation();
    navigate(`/deck/${deck.id}/edit`)
  }

  const dispatchDeleteDeck = (e) => {
    e.preventDefault();
    dispatch(deleteDeck(deck.id));
  }

  return (
    <>
    <li 
        className="deck-list__item"
        onClick={navigateToDeckStudy}
      >
        <h4 className="deck-list__heading">{deck.name}</h4>
        <div className="deck-list__actions">
          <span 
          className="deck-list__action"
          onClick={navigateToDeckEdit}
          >Edit</span>
          <span 
            className="deck-list__action"
            onClick={handleClick}
          >Delete</span>
        </div>
      </li>
      {
        modalOpen ? 
        <Modal 
          handleSubmit={dispatchDeleteDeck}
          error={''}
          buttonText="Delete Deck"
          buttonDisabled={false}
          handleModalClose={() => setModalOpen(false)}
          modalHeading={`Delete Deck: ${deck.name}?`}
        />
        : null
      }
    </>
  )
}

export default DeckListItem