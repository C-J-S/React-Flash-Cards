import React from 'react'

import './SubmitButton.css';

const SubmitButton = ({form, value, disabled}) => {
  return (
    <input 
      className="button" 
      type="submit" 
      value={value}
      form={form}
      disabled={disabled}
    />
  )
}

export default SubmitButton