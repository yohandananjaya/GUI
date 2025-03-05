import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ onLoginClick }) =>  {
  return (
    <header>
      <h1 className="logo">WORKBRIDGE</h1>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <button className="login_button" onClick={onLoginClick}>Login</button>
      </nav>
    </header>
  );
}

export default Header;
