<template>
    <button @click="logout" :disabled="isLoggingOut">
      {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
    </button>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/authStore.js";
// import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

const isLoggingOut = ref(false);

const logout = async () => {
    isLoggingOut.value = true;
    try {
        //await axios.get('http://localhost:3000/auth/logout');
        //localStorage.removeItem('token');
        await authStore.logout();
        //router.push('/chat');
    }   catch (error) {
            console.error('Logout failed:', error);
    }   finally {
            isLoggingOut.value = false;
  }
};
</script>