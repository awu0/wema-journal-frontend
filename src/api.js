// src/api.js
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://0.0.0.0:8000';

export const getUsers = async () => {
  return axios.get(`${BACKEND_URL}/users`);
};

export const getUserByEmail = async (email) => {
  return axios.get(`${BACKEND_URL}/users/${email}`);
};

export const updateUser = async (email, userData) => {
  return axios.patch(`${BACKEND_URL}/users/${email}`, userData);
};

export const deleteUser = async (email) => {
  return axios.delete(`${BACKEND_URL}/users/${email}`);
};

export const getRoles = async () => {
  return axios.get(`${BACKEND_URL}/roles`);
};

export const login = async (email, password) => {
  return axios.post(`${BACKEND_URL}/auth/login`, { email, password });
};

export const getManuscripts = async () => {
  return axios.get(`${BACKEND_URL}/manuscripts`);
};

// Extracted from Masthead component
export const getMasthead = async () => {
  return axios.get(`${BACKEND_URL}/users/masthead`);
};

// People object to array transform helper
export const peopleObjectToArray = (data) => {
  const keys = Object.keys(data);
  return keys.map((key) => data[key]);
};