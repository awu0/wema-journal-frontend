// src/services/authService.js
import axios from 'axios';

// Use your existing BACKEND_URL or set default
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://wl2612.pythonanywhere.com';
const API_URL = `${BACKEND_URL}/api`;

/**
 * Set authentication token in Axios headers
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

/**
 * Initialize authentication from localStorage
 */
const initAuth = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

/**
 * Login user - using your existing implementation
 */
const login = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Register user
 */
const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      setAuthToken(response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 */
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  setAuthToken(null);
};

/**
 * Get current user data
 */
const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Get user profile from API
 */
const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify token is still valid with the backend
 */
const verifyToken = async () => {
  if (!isAuthenticated()) {
    return false;
  }
  
  try {
    await getUserProfile();
    return true;
  } catch (error) {
    // If token is invalid, logout
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
    }
    return false;
  }
};

const authService = {
  setAuthToken,
  initAuth,
  login,
  signup,
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserProfile,
  verifyToken
};

export default authService;