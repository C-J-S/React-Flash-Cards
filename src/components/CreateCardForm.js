import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import './CreateCardForm.css';
import Input from './global/Input';
import SubmitButton from './global/SubmitButton';
import { createCard } from '../actions/cardActions';
import { closeNav } from '../actions/navActions';
import { generateRandomNumber } from '../utils';

const CreateCardForm = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [cardFrontValue, setCardFrontValue] = useState('');
  const [cardBackValue, setCardBackValue] = useState('');

  const {navOpen, cards} = useSelector(state => {
    const navOpen = state.nav;
    const cards = state.cards.filter(card => card.deckId === params.deckId);
    return { navOpen, cards }
  });

  const updateCardFront = (value) => setCardFrontValue(value);
  const updateCardBack = (value) => setCardBackValue(value);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(createCard({
      front: cardFrontValue,
      back: cardBackValue,
      deckId: params.deckId,
      cardId: generateRandomNumber()
    }));

    setCardBackValue('');
    setCardFrontValue('');
  };

  useEffect(() => {
    if(navOpen) dispatch(closeNav());
  }, []);

  return (
    <form 
      className="form content-container"
      onSubmit={handleFormSubmit}
      id="card-details"
    >
      <div className="form__heading">
        <div className="form__nav">
          <Link to={`/deck/${params.deckId}/study`}>Study</Link>
          <Link to={`/deck/${params.deckId}/edit`}>Edit</Link>
        </div>
        <div className="form__card-count">
          <p> You have created: <span>{cards.length}</span> cards</p>
        </div>
      </div>
      <Input 
        label="Card Front"
        inputValue={cardFrontValue} 
        updateInputValue={updateCardFront} 
        inputEl="textarea"
      />
        <Input 
        label="Card Back"
        inputValue={cardBackValue} 
        updateInputValue={updateCardBack}
        inputEl="textarea" 
      />
      <SubmitButton 
        form="card-details" 
        value="create card"
        disabled={!cardFrontValue || !cardBackValue}
      />
    </form>
  )
}

export default CreateCardForm