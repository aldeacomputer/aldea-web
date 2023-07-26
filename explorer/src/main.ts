import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { routes } from './routes'
import './style.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const store = createPinia()

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

declare global {
  interface GraphLink {
    title: string;
    value: string;
    url: string;
  }
}