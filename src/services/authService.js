import { authService } from '../environment/Environment';
import api from '../utils/axios.config';

export const loginByUsername = async (requiredBody) => {
  return await api.post(`${authService}/v1/auth/login`, requiredBody);
};

export const resetPassword = async (requiredBody) => {
  return await api.put(`${authService}/v1/auth/reset-password`, requiredBody);
};

export const refreshToken = async (refreshToken) => {
  return await api.put(`${authService}/v1/auth/refresh_token`, {
    refreshToken: refreshToken,
  });
};
