<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav>
    <ul>
      <li v-if="route.path !== '/legal-mentions'">
        <router-link to="/legal-mentions">Mentions légales</router-link>
      </li>
      
      <li v-if="route.path !== '/terms-of-use'">
        <router-link to="/terms-of-use">Règles d'utilisation</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav ul {
    list-style-type: none;
    padding: 0;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    margin-left: 2rem;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}
</style>
