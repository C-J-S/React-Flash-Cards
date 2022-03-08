import React from 'react';

import './ButtonFlat.css';

const ButtonFlat = ({handleClick, text, arrowDirection}) => {
  return (
    <button 
      className={`button-flat ${arrowDirection}`}
      onClick={handleClick}
    >
      {arrowDirection === 'left' ? <span>&larr;</span> : null }
      <p className="button__text">{text}</p>
      {arrowDirection === 'right' ? <span>&rarr;</span> : null }
    </button>
  )
}

export default ButtonFlat;