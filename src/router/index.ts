import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('../views/HomeView.vue')
const Settings = () => import('../views/SettingsView.vue')
const PrivacyPolicy = () => import('../views/PrivacyPolicy.vue')

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
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPolicy
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
