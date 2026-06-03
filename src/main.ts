import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import { useAuthStore } from './store/authStore';

const app = createApp(App);
app.use(router).mount('#app');

useAuthStore().initAuth();
