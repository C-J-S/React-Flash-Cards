import React from 'react';

import './Input.css';

const Input = ({label, inputValue, updateInputValue, inputEl, error}) => {

  const handleInputChange = (e) => {
    updateInputValue(e.target.value);
  }

  return (
    <div className="input__container">
       { inputEl === 'textarea' ? 
        <textarea
          id={label} 
          className={`input__input${error ? ' error': ''}`} 
          value={inputValue}
          onChange={handleInputChange}
        /> : 
        <input
          type="text"
          id={label} 
          className={`input__input${error ? ' error': ''}`} 
          value={inputValue}
          onChange={handleInputChange}
        />
      }
      <label className="input__label" htmlFor={label}>{label}</label>
    </div>
  )
}

export default Input;