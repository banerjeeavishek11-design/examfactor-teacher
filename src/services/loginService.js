import { host, loginService } from '../environment/Environment';
import api from '../utils/axios.config';

export const loginByUsername = async (requiredBody) => {
  return await api.post(`${loginService}/v1/auth/login`, requiredBody, {
    headers: {
      'Content-Type': 'application/json',
      Host: host,
    },
  });
};

export const resetPassword = async (requiredBody) => {
  return await api.put(`${loginService}/v1/auth/reset-password`, requiredBody);
};
