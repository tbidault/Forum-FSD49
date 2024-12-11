import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: null,
    isLoading: false,
    isRoleFetched: false,
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
      this.decodeToken();
    },
    removeToken() {
      this.token = null;
      this.userRole = null;
      this.isRoleFetched = false;
      localStorage.removeItem('token');
    },
    async decodeToken() {
      if (this.token) {
        this.isLoading = true;
        const decodedToken = jwtDecode(this.token);
        try {
          const user = await axios.get(`https://forum-fsd49.onrender.com/users/${decodedToken.id}`);
          this.userRole = user.data[0]?.role || null;
          this.isRoleFetched = true;
        } catch (error) {
          console.error('Erreur lors de la récupération du rôle :', error);
          this.userRole = null;
          this.isRoleFetched = true;
        } finally {
          this.isLoading = false;
        }
      }
    },
    async login(user, router) {
      try {
        const response = await axios.post('https://forum-fsd49.onrender.com/auth/login', user);
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
        await axios.get('https://forum-fsd49.onrender.com/auth/logout');
        this.removeToken();
        window.location.reload();
      } catch (error) {
        throw new Error('Logout failed');
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.userRole === 'admin' && !state.isLoading,
  },
});