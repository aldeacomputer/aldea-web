import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import { OutputResponse, PackageResponse, abi } from '@aldea/sdk'
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

  interface MetaData {
    after?: string;
    before?: string;
    total_count: number;
  }

  interface DataOf<T> {
    data: Array<T>;
    meta?: MetaData;
  }

  interface BlockData {
    id: string;
    height: number;
    prev_block_id: string;
    creator: string;
    created_at: number;
    tx_root: string;
    state_root: string;
    state_commit: string;
    sig: string;
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

  interface TxData {
    id: string;
    rawtx: string;
    reads: string[];
    spends: string[];
    outputs: OutputResponse[];
    packages: PackageResponse[];
    //timestamp: number;
    //block_id?: string;
    //block_height?: number;
  }

  interface TxDataMin {
    id: string;
    rawtx: string;
    block_id?: string;
  }

  interface TxSize {
    id: string;
    size: number;
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