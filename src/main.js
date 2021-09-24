import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css';
import Vant from 'vant';
createApp(App).use(Vant).use(store).use(router).mount('#app');
