import { createRouter, createWebHistory } from 'vue-router'
import {routes} from 'src/router/routes';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //TODO: get rid of 'as any'
  routes:routes as any
})
export default router
