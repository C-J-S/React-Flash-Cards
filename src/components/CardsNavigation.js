import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './CardsNavigation.css';
import ButtonFlat from './global/ButtonFlat';

const CardsNavigation = ({
  handleBackClick, 
  handleForwardClick,
  cardIndex,
  linkTo,
  linkText
}) => {

  const cards = useSelector(state => state.cards);

  return (
    <div className="cards__navigation">
      {cards.length > 1 ?
        <>
          <div className="card-count">Card: {cardIndex+1}</div>
          <ButtonFlat 
            handleClick={handleBackClick}
            text="back"
            arrowDirection="left"
          />
          <ButtonFlat 
            handleClick={handleForwardClick}
            text="forward"
            arrowDirection="right"
          />
        </> 
        : null }
      <Link 
        to={linkTo}
      >{linkText}</Link>
    </div>
  )
}

export default CardsNavigation;