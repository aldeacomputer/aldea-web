import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { CommitTxResponse, OutputResponse, PackageResponse, abi } from '@aldea/sdk'
import { routes } from './routes'
import * as helpers from './helpers'
import './style.css'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const store = createPinia()
const head = createHead()

const app =createApp(App)
  .use(router)
  .use(store)
  .use(head)

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

  interface JigData extends OutputResponse {
    abi: abi.Abi;
    props: Record<string, any>;
  }

  interface PkgData extends PackageResponse {
    abi: abi.Abi;
  }

  interface PkgDocs {
    package?: {
      description: string;
      tags: Array<{
        tag: string;
        name: string;
        description: string;
      }>;
    };
    docs: Record<string, string>;
  }

  interface TxData extends CommitTxResponse {
    timestamp: number;
  }

  interface SearchResult {
    type: 'addr' | 'jig' | 'pkg' | 'tx';
    value: string;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $helpers: typeof helpers
  }   
}