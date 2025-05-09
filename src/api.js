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
  const token = localStorage.getItem('authToken'); 
  return axios.delete(`${USER_ENDPOINT}/${email}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getRoles = async () => {
  return axios.get(`${BACKEND_URL}/roles`);
};

export const login = async (email, password) => {
  return axios.post(`${BACKEND_URL}/login`, { email, password });
};

export const register = async (name, email, password, affiliation) => {
  return axios.post(`${BACKEND_URL}/register`, { name, email, password, affiliation, roles: "author" });
};

export const getManuscripts = async () => {
  return axios.get(MANUSCRIPT_ENDPOINT);
};

export const getManuscriptsById = async (id) => {
  return axios.get(`${MANUSCRIPT_ENDPOINT}/${id}`);
}

export const getManuscriptStates = () => {
  return axios.get(`${MANUSCRIPT_ENDPOINT}/states`);
};

export const deleteManuscript = async (id) => {
  return axios.delete(`${MANUSCRIPT_ENDPOINT}/${id}`);
}

export const updateManuscript = async (id, updatedFields) => {
  return axios.patch(`${MANUSCRIPT_ENDPOINT}/${id}`, updatedFields);
};

export const manuscriptReceiveAction = async (_id, state, action, ref=undefined) => {
  const data = ref ? { _id, state, action, ref } : { _id, state, action };
  
  return axios.put(`${MANUSCRIPT_ENDPOINT}/receive_action`, data);
};

export const getManuscriptValidActions = async (state) => {
  return axios.post(`${MANUSCRIPT_ENDPOINT}/valid_actions`, { state });
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