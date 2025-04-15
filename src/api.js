// src/api.js
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://0.0.0.0:8000';

export const getUsers = async () => {
  return axios.get(`${BACKEND_URL}/users`);
};

export const login = async (email, password) => {
  return axios.post(`${BACKEND_URL}/auth/login`, { email, password });
};

