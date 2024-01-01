import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (pathname) => (location.pathname === pathname ? 'active' : '');

  return (
    <nav id="navbar">
      <img alt="logo" src={logo} />
      <h1>Space Travelers&#39; Hub</h1>
      <ul id="menu">
        <li className={isActive('/rockets')}>
          <Link to="/rockets">Rockets</Link>
        </li>
        <li className={isActive('/missions')}>
          <Link to="/missions">Missions</Link>
        </li>
        <li className={isActive('/dragons')}>
          <Link to="/dragons">Dragons</Link>
        </li>
        <li className={isActive('/')}>
          <Link id="profile" to="/">My Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
