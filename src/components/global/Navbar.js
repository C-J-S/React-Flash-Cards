import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.css';
import { openNav, closeNav } from '../../actions/navActions';

const Navbar = ({children}) => {
  const navOpen = useSelector(state => state.nav);
  const dispatch = useDispatch();

  const toggleNav = () => {
    if(navOpen) {
      dispatch(closeNav());
      return;
    }

    dispatch(openNav());
  }

  return (
    <div className="navbar">
      <div 
        className={`hamburger${navOpen ? ' nav-open' : '' }`}
        onClick={toggleNav}
      >
        <span className="hamburger__handle"></span>
      </div>
      <nav className="navbar__nav">
        <ul className="navbar__list">
          {children}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;