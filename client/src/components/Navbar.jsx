import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">LifeInWeeks</Link>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;