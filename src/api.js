// src/api.js
import axios from 'axios';
import {BACKEND_URL} from './constants';

const USER_ENDPOINT = `${BACKEND_URL}/users`
const MANUSCRIPT_ENDPOINT = `${BACKEND_URL}/manuscripts`

export const getUsers = async () => {
  return axios.get(USER_ENDPOINT);
};

export const createUser = async (newUser) => {
  return axios.post(USER_ENDPOINT, newUser)
}

export const getUserByEmail = async (email) => {
  return axios.get(`${USER_ENDPOINT}/${email}`);
};

export const updateUser = async (email, userData) => {
  return axios.patch(`${USER_ENDPOINT}/${email}`, userData);
};

export const deleteUser = async (email) => {
  return axios.delete(`${USER_ENDPOINT}/${email}`);
};

export const getRoles = async () => {
  return axios.get(`${BACKEND_URL}/roles`);
};

export const login = async (email, password) => {
  return axios.post(`${BACKEND_URL}/login`, { email, password });
};

export const register = async (email, password) => {
  return axios.post(`${BACKEND_URL}/register`, { email, password });
};

export const getManuscripts = async () => {
  return axios.get(MANUSCRIPT_ENDPOINT);
};

export const getManuscriptsById = async (id) => {
  return axios.get(`${MANUSCRIPT_ENDPOINT}/${id}`);
}

export const deleteManuscript = async (id) => {
  return axios.delete(`${MANUSCRIPT_ENDPOINT}/${id}`);
}

// Extracted from Masthead component
export const getMasthead = async () => {
  return axios.get(`${BACKEND_URL}/users/masthead`);
};

// People object to array transform helper
export const peopleObjectToArray = (data) => {
  const keys = Object.keys(data);
  return keys.map((key) => data[key]);
};