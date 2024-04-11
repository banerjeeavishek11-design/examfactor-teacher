import axios from 'axios';
import { host, loginService } from '../environment/Environment';

export const loginByUsername = async (requiredBody) => {
  return await axios.post(`${loginService}/v1/auth/login`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Host: host,
    },
  });
};

export const resetPassword = async (token, requiredBody) => {
  return await axios.put(`${loginService}/v1/auth/reset-password`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Host: host,
    },
  });
};
