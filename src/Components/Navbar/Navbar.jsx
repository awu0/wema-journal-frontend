import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
  return (
    <li>
      <Link to={destination}>{label}</Link>
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
    <nav>
      <ul className="wrapper">
        {PAGES.map((page) => <NavLink key={page.destination} page={page} />)}
      </ul>
    </nav>
  );
}

export default Navbar;
