<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav>
    <ul>
      <li v-if="route.path !== '/legal-mentions'">
        <router-link to="/legal-mentions"><button>Mentions légales</button></router-link>
      </li>
      
      <li v-if="route.path !== '/terms-of-use'">
        <router-link to="/terms-of-use"><button>Règles d'utilisation</button></router-link>
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
