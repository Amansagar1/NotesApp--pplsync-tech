'use client';

import axios from 'axios';
import EndPoints from './ApiEndpoint';

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('session_token');
    if (stored) return stored;
  }
  const match = document.cookie.match(/session_token=([^;]+)/);
  return match ? match[1] : null;
};

axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//login apii

export function loginApi(data) {
  return axios
    .post(EndPoints.LOGIN_API(), data)
    .then((res) => {
      const token = res.data?.token;
      if (token) {
        localStorage.setItem('session_token', token);
        document.cookie = `session_token=${token}; path=/; samesite=lax`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return res.data;
    })
    .catch((err) => {
      throw err.response?.data || err;
    });
}

export function signupApi(data) {
  return axios
    .post(EndPoints.REGISTER_API(), data)
    .then((res) => {
      const token = res.data?.token;
      if (token) {
        localStorage.setItem('session_token', token);
        document.cookie = `session_token=${token}; path=/; samesite=lax`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return res.data;
    })
    .catch((err) => {
      throw err.response?.data || err;
    });
}

export const listNotes = () => {
  return axios
    .get(EndPoints.NOTES_LIST())
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export const createNote = (data) => {
  return axios
    .post(EndPoints.NOTES_CREATE(), data)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export const getNote = (id) => {
  return axios
    .get(EndPoints.NOTE_DETAIL(id))
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export const updateNote = (id, data) => {
  return axios
    .put(EndPoints.NOTE_UPDATE(id), data)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};

export const deleteNote = (id) => {
  return axios
    .delete(EndPoints.NOTE_DETAIL(id))
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};
