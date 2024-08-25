import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4026',
});

instance.interceptors.request.use(
  (config) => {
    console.log('Axios request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log('Axios response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Axios response error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default instance;