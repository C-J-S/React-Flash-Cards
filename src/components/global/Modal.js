import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';
import SubmitButton from './SubmitButton';
import Error from './Error'

const Modal = ({
  handleSubmit,
  error,
  handleModalClose,
  buttonText, 
  buttonDisabled,
  modalHeading,
  children
}) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <form 
        id="modal-form" 
        className="modal__content"
        onSubmit={handleSubmit}
      >
        <span 
          className="modal__close"
          onClick={handleModalClose}
        >&times;</span>
        {modalHeading ? <h3>{modalHeading}</h3> : null}
        { children }
        {error ? <Error error={error}/> : null }
        <SubmitButton 
          for="modal-form"
          value={buttonText}
          disabled={buttonDisabled}
        />
      </form>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal