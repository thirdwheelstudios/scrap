import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Record = () => import('../views/RecordView.vue')
const ScrapBook = () => import('../views/ScrapBookView.vue')
const Settings = () => import('../views/SettingsView.vue')
const PrivacyPolicy = () => import('../views/PrivacyPolicy.vue')
const About = () => import('../views/AboutView.vue')

const routes = [
  {
    path: '/',
    name: 'record',
    component: Record,
  },
  {
    path: '/scrap-book',
    name: 'scrap-book',
    component: ScrapBook,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPolicy,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'is-active',
})

export default router
