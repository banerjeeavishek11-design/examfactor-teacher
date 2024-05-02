import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { notifyMessage } from './error-toast-API';

const storage = new MMKV();
const api = axios.create({
  baseURL: 'https://api.dev.examfactor.co',
});

const getAccessToken = () => {
  const accessToken = storage.getString('access_token');
  return accessToken;
};

let navigationRef;

export const setNavigationReference = (ref) => {
  navigationRef = ref;
};

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      notifyMessage('Token Expired, Login required');
      setTimeout(() => {
        navigationRef.navigate('LoginScreen');
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default api;
