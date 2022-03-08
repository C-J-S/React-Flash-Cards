import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Home from './Home';
import DeckView from './DeckView';
import CreateCardForm from './CreateCardForm';
import EditCardForm from './EditCardForm';
import Navbar from './global/Navbar';
import PageNotFound from './global/PageNotFound';
import useLocalStorage from '../hooks/useLocalStorage';

const App = () => {
  const {cards, decks} = useSelector(state => state);

  useLocalStorage({data: cards, label: 'cards'});
  useLocalStorage({data: decks, label: 'decks'});
  
  return (
    <main className="app">
      <Navbar>
        <li>
          <Link to="/" >Home</Link>
        </li>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards/create/:deckId" element={<CreateCardForm />} />
        <Route path="/cards/edit/:deckId/:cardId" element={<EditCardForm />} />
        <Route path="/deck/:deckId/:viewOption" element={<DeckView />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  )
}

export default App;