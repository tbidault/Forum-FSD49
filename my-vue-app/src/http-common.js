import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://forum-fsd49.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
