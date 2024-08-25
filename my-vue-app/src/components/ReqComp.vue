<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const message = ref('');

onMounted(() => {
  axios.get('http://localhost:3000/')
    .then(response => {
      message.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching message:', error);
    });
});
</script>
