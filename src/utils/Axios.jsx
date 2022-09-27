import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'https://lariqueza.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage) {
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
