import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

import { setupPrimeVue } from './primevue-components';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

setupPrimeVue(app);

app.mount('#app');
