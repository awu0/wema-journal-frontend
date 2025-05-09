import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import authService from "../auth";
import {DEFAULT_USER_ROLE} from "../constants";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate form
    if (!name || !email || !affiliation || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    authService.register(name, email, password, affiliation, DEFAULT_USER_ROLE).then(() => {
      // redirect to page
      navigate('/home');
      window.location.reload();
    }).catch((error) => {
      console.log(error.response);
      setError(error.response.data.message);
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">WEMA Journal</h1>
        <h2 className="login-subtitle">Create an Account</h2>

        <form onSubmit={handleRegister} className="login-form">
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="affiliation">Affiliation</label>
            <input
              type="text"
              id="affiliation"
              placeholder="Enter your academic affiliation"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Register
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;