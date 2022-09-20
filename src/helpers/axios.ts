import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {store} from '../redux/store/configureStore';
import {getData, storeData} from './async-storage';
import {LoginResponse} from '../types';
import {logout} from '../redux/actions/auth';

const cache = {
  retry: true,
};

const defaultOptions = {
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

// instance.interceptors.request.use(
//   async (request: AxiosRequestConfig) => {
//     const auth = store.getState().auth;
//     const isLoggedIn = auth.isLoggedIn;
//     if (isLoggedIn) {
//       const access_token = await getData('@msa-user');
//       if (request.headers) {
//         request.headers.Authorization = `Bearer ${access_token}`;
//       }
//     }
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Edit response config
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401) {
//       // TODO: What happens? You should probably get kicked out
//       cache.retry = true;
//       logout();
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && cache.retry) {
//       cache.retry = false;
//       const refresh_token = await getData('@dc-refresh-token');
//       if (refresh_token) {
//         const res = await instance.post('/users/refresh-token', {
//           refreshToken: refresh_token,
//         });
//         if (res.status === 201) {
//           const payload: LoginResponse = res.data.payload;
//           await storeData('@dc-refresh-token', payload.refresh_token);
//           await storeData('@dc-access-token', payload.access_token);
//           cache.retry = true;
//           return instance(originalRequest);
//         }
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default instance;
