import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: API_KEY,
    units: 'metric',
  };
  return config;
});

export default api;
