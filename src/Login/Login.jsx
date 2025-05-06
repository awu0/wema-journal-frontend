import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authService from "../auth";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setError('Both fields are required.');
      return
    }
    
    setError('');
    
    authService.login(email, password).then(() => {
      // redirect to page
      navigate('/home');
      window.location.reload();
    }).catch((error) => {
      setError(error.response.data.message);
    })
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">WEMA Journal</h1>

        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Log in</button>
        </form>

        <div className="auth-links">
          <Link to="/reset-password" className="auth-link">Forgot your password?</Link>
          <Link to="/register" className="auth-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
