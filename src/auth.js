// src/services/authService.js
import axios from "axios";
import {BACKEND_URL} from './constants';
import * as api from "./api";

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
  const response = await api.login(email, password);

  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    setAuthToken(response.data.token);
  }

  return response.data;
};

/**
 * Register user
 */
const register = async (name, email, password, affiliation, role) => {
  const response = await api.register(name, email, password, affiliation, role);

  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    setAuthToken(response.data.token);
  }

  return response.data;
};

/**
 * Logout user
 */
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  setAuthToken(null);
  window.location.reload();
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
  const response = await axios.get(`${BACKEND_URL}/me`);
  return response.data;
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
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserProfile,
  verifyToken
};

export default authService;