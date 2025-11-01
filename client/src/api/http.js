import axios from 'axios';
import { BASE_URL } from './urls.js';
import { getToken } from './token.js';

export const http = axios.create({ baseURL: BASE_URL });

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Let browser set content-type for FormData
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});
