import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Input from './global/Input';
import SubmitButton from './global/SubmitButton';
import { editCard } from '../actions/cardActions';
import { closeNav } from '../actions/navActions';

const EditCardForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [cardFrontValue, setCardFrontValue] = useState('');
  const [cardBackValue, setCardBackValue] = useState('');
  const {card, nav: navOpen} = useSelector(state => {
    const card = state.cards.filter(card => {
      return card.cardId === Number(params.cardId)
    })[0];
    const nav = state.nav;
    return { card, nav}
  });

  const updateCardFront = (value) => setCardFrontValue(value);
  const updateCardBack = (value) => setCardBackValue(value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(editCard({
      ...card,
      front: cardFrontValue,
      back: cardBackValue
    }))
  }

  const closeNavOnPageOpen = () => {
    if(navOpen) dispatch(closeNav());
  }

  useEffect(() => {
    updateCardFront(card.front);
    updateCardBack(card.back);
    closeNavOnPageOpen();
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
        value="save edit"
        disabled={!cardFrontValue || !cardBackValue}
      />
    </form>
  )
}

export default EditCardForm;