<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import LogoutComp  from './logoutComp.vue';
import { useAuthStore } from '../stores/authStore';

const components = {
  LogoutComp,
};

const route = useRoute();
const authStore = useAuthStore();
const logout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<template>
  <nav>
    <ul>
      <li v-if="route.path !== '/'">
        <router-link to="/">Accueil</router-link>
      </li>
      
      <li v-if="!authStore.token && route.path !== '/login'">
        <router-link to="/login">Connexion</router-link>
      </li>

      <li v-if="!authStore.token && route.path !== '/register'">
        <router-link to="/register">Créer un compte</router-link>
      </li>

      <li v-if="route.path !== '/chat'">
        <router-link to="/chat">Discussion</router-link>
      </li>

      <li v-if="route.path !== '/settings'">
        <router-link to="/settings">Paramètres</router-link>
      </li>
      <li v-if="authStore.token">
        <logout-comp />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}
</style>
