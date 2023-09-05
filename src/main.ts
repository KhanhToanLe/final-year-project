import 'assets/main.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import CIcon from 'base/CIcon.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register global component
//TODO: get rid of any
app.component('CIcon',CIcon as any);

app.mount('#app')
