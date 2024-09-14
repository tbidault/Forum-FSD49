import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
    async login(user, router) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', user);
        this.setToken(response.data.token);
        router.push('/chat');
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error('Server error:', error.response.data);
          throw new Error('Login failed: ' + error.response.data.message);
        }
        else if (error.request) {
          console.error('Network error:', error.request);
          throw new Error('Login failed: Network error');
        }
        else {
          console.error('Error:', error.message);
          throw new Error('Login failed: ' + error.message);
        }
      }
    },
    async logout() {
      try {
        await axios.get('http://localhost:3000/auth/logout');
        this.removeToken();
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  },
});