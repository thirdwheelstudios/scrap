import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
