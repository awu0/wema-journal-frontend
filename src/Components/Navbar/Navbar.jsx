import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import authService from "../../auth";

const PAGES = [
  { label: 'Home', destination: '/home' },
  { label: 'View People', destination: '/people' },
  { label: 'View Manuscripts', destination: '/manuscripts' },
  { label: 'Submissions', destination: '/submissions' },
  { label: 'Masthead', destination: '/masthead' },
  { label: 'About', destination: '/about' },
  { label: 'Login', destination: '/login' },
];

function NavLink({ page }) {
  const { label, destination } = page;
  
  const isLogin = label === 'Login';

  const authToken= !!localStorage.getItem('authToken');

  if (isLogin && authToken) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    return (
      <li className={`login-item`}>
        Hello {userData.name}, <a onClick={authService.logout}>Logout</a>
      </li>
    )
  }
  
  // return login page
  return (
    <li className={`nav-item ${isLogin ? 'login-item' : ''}`}>
      <Link 
        to={destination} 
        className={`nav-link ${isLogin ? 'login-link' : ''}`}
      >
        {label}
      </Link>
    </li>
  );
}

NavLink.propTypes = {
  page: propTypes.shape({
    label: propTypes.string.isRequired,
    destination: propTypes.string.isRequired,
  }).isRequired,
};


function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {PAGES.map((page) => (
          <NavLink key={page.destination} page={page} />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
