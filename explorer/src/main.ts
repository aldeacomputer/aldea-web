import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { Abi } from '@aldea/core/abi'
import { OutputResponse } from '@aldea/sdk'
import { routes } from './routes'
import * as helpers from './helpers'
import './style.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const store = createPinia()

const app =createApp(App)
  .use(router)
  .use(store)

app.config.globalProperties.$helpers = {
  ...helpers
}

app.mount('#app')

declare global {
  interface GraphLink {
    title: string;
    value: string;
    url: string;
  }

  interface Jig extends OutputResponse {
    abi: Abi;
    props: Record<string, any>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $helpers: typeof helpers
  }   
}