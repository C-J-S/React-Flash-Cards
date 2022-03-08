import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Home.css';
import Modal from './global/Modal';
import ButtonFlat from './global/ButtonFlat';
import DeckListItem from './DeckListItem';
import Input from './global/Input';
import { closeNav } from '../actions/navActions';
import { createDeck } from '../actions/deckActions';

const Home = () => {
  const MAX_CHARACTERS = 35;
  const [modalOpen, setModalOpen] = useState(false);
  const [deckName, setDeckName] = useState('');
  const [error, setError] = useState('');
  const {nav: navOpen, decks} = useSelector(state => state);
  const dispatch = useDispatch();

  const updateDeckName = (value) => {
    if(error) setError('');

    if(value.length < MAX_CHARACTERS) {
      setDeckName(value);
      return;
    }

    setError(`Name Exceeds ${MAX_CHARACTERS} character limit`);
  }

  const closeModal = () => {
    setModalOpen(false);
    setError('');
    setDeckName('');
  }

  const dispatchCreateDeck = (e) => {
    e.preventDefault();

    const lowerCaseDeckNames = decks.map(deck => deck.name.toLowerCase());
    const lowerCaseNewName = deckName.toLocaleLowerCase();

    if(lowerCaseDeckNames.includes(lowerCaseNewName)) {
      setError(`Name "${lowerCaseNewName}" is already in use`);
    }else {
      dispatch(createDeck(deckName));
      closeModal();
    }
  }

  useEffect(() => {
    if(navOpen) dispatch(closeNav());
  }, []);

  return (
    <>
      <div className="content-container">
        { decks.length ? 
            <ul className="deck-list">
              {decks.map((deck, deckIdx) => (
                <DeckListItem deck={deck} key={deckIdx} />
              ))}
            </ul> : <p className="user-message">No decks have been created</p>
        }
        { modalOpen ? 
          <Modal
            handleSubmit={dispatchCreateDeck}
            error={error}
            handleModalClose={closeModal}
            buttonText="Create Deck"
            buttonDisabled={!deckName || error}
          >
            <Input 
              label="Deck Name"
              inputValue={deckName}
              updateInputValue={updateDeckName}
              inputEl="input"
              error={error}
            />
          </Modal>
          : null 
        }
      </div>
      <ButtonFlat 
        text="Create Deck" 
        handleClick={() => setModalOpen(true)}
        arrowDirection="right" 
      />
    </>
  )
};

export default Home;