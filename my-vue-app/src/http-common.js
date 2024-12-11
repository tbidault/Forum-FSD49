import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://forum-fsd49.onrender.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const instance = axios.create({
  baseURL: 'https://forum-fsd49.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
