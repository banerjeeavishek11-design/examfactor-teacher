import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
// import { notifyMessage } from './error-toast-API';
import { refreshToken } from '../services/authService';

const storage = new MMKV();
const api = axios.create({
  baseURL: 'https://api.dev.examfactor.co',
});

const getAccessToken = () => {
  const accessToken = storage.getString('access_token');
  return accessToken;
};

const getRefreshToken = () => {
  const refreshToken = storage.getString('refresh_token');
  return refreshToken;
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
      try {
        const rt = getRefreshToken();
        const at = getAccessToken();
        refreshToken(rt, at)
          .then((res) => {
            storage.set('access_token', res.data.access_token);
            storage.set('refresh_token', res.data.refresh_token);
          })
          .catch((error) => {
            if (error?.response.status === 400 || error?.response.code === 'ERR-03') {
              // notifyMessage('Token Expired, Login Required');
              navigationRef.navigate('LoginScreen', {
                sessionExpire: 'Current session has been Expired',
              });
              // setTimeout(() => {
              // }, 800);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
