import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';

import './CardView.css';
import CardsNavigation from './CardsNavigation';
import { closeNav } from '../actions/navActions';

const CardView = ({cards}) => {
  const [ cardFlipped, setCardFlipped ] = useState(false);
  const [ cardIndex, setCardIndex ] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { nav: navOpen} = useSelector(state => state);
  const dispatch = useDispatch();


  const flipCard = () => {
    setTransitioning(true);
    setCardFlipped(flipped => !flipped);
  }


  const incrementIndex = () => {
    const canIncrement = !transitioning && cardIndex < cards.length - 1;

    if(canIncrement && !cardFlipped) {
      setCardIndex(cardIndex+1);
    }else if(canIncrement && cardFlipped){
      setCardFlipped(false);
      setTimeout(()  => {
        setCardIndex(cardIndex+1);
      }, 1000);
    }
  }

  const decrementIndex = () => {
    const canDecrement = !transitioning && (cardIndex > 0);
    
    if( canDecrement && !cardFlipped) {
      setCardIndex(cardIndex-1);
    }else if(canDecrement && cardFlipped){
      setCardFlipped(false);
      setTimeout(()  => {
        setCardIndex(cardIndex-1);
      }, 1000);
    }
  }

  const handleTransitionEnd = () => {
    setTransitioning(false);
  }

  useEffect(() => {
    if(navOpen) dispatch(closeNav()); 
  }, []);

  return (
    cards.length ? 
      <div>
        <div
          className={`content-container card${cardFlipped ? ' flipped' : '' }`} 
          onClick={flipCard}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="card__inner">
            <div className="card__back card__face">
              <h4 className="card__face-heading">Back</h4>
              <p>{cards[cardIndex].back}</p>
            </div>
            <div className="card__front card__face">
              <h4 className="card__face-heading">Front</h4>
              <p>{cards[cardIndex].front}</p>
            </div>
          </div>
        </div>
        <CardsNavigation 
          handleBackClick={decrementIndex}
          handleForwardClick={incrementIndex}
          cardIndex={cardIndex}
          linkTo={`/deck/${cards[0].deckId}/edit`} 
          linkText="Edit Deck"
        />
      </div>
      :
      <p className="user-message">No Cards in deck</p>
  )
}

export default CardView