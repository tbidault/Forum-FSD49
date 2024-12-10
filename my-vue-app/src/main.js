import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router/index';
import axios from 'axios';

axios.defaults.withCredentials = true;
const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount('#app');
