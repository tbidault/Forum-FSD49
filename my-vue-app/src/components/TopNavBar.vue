<script setup>
import { useRoute } from 'vue-router';
import { watchEffect, ref, onMounted } from 'vue';
import LogoutComp  from './logoutComp.vue';
import { useAuthStore } from '../stores/authStore';

const components = {
  LogoutComp,
};

const route = useRoute();
const authStore = useAuthStore();
onMounted(async () => {
  if (authStore.token && !authStore.isRoleFetched) {
    await authStore.decodeToken();
  }
});
watchEffect(() => {
  console.log('authStore.isAdmin', authStore.isAdmin);
});

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
        <router-link to="/"><button>Accueil</button></router-link>
      </li>
      
      <li v-if="!authStore.token && route.path !== '/login'">
        <router-link to="/login"><button>Connexion</button></router-link>
      </li>

      <li v-if="!authStore.token && route.path !== '/register'">
        <router-link to="/register"><button>Créer un compte</button></router-link>
      </li>

      <li v-if="route.path !== '/chat'">
        <router-link to="/chat"><button>Discussion</button></router-link>
      </li>

      <li v-if="authStore.isAdmin && route.path !== '/dashboard' && !authStore.isLoading">
        <router-link to="/dashboard"><button>Dashboard</button></router-link>
      </li>

      <li v-if="authStore.isAuthenticated && route.path !== '/settings'">
        <router-link to="/settings"><button>Paramètres</button></router-link>
      </li>
      <li v-if="authStore.token">
        <logout-comp />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #e3dcdc1e;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
button:hover {
    background-color: white;
    color: black;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}
@media (max-width: 768px) {
  button {
    font-size: 10px;
    padding: 6px 8px;
  } 

  nav ul li {
    margin-bottom: 10px;
  }
  nav ul li {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
}
</style>
