'use client';

import axios from 'axios';
import EndPoints from './ApiEndpoint';

export function loginApi(data) {
  return axios
    .post(EndPoints.LOGIN_API(), data)
    .then(r => r.data)
    .catch(e => {
      throw e.response?.data || e;
    });
}

export function signupApi(data) {
  return axios
    .post(EndPoints.REGISTER_API(), data)
    .then(r => r.data)
    .catch(e => {
      throw e.response?.data || e;
    });
}
