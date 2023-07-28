import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { Aldea } from '@aldea/sdk'
import { ChainAdapter } from './blockchain/adapter'
import { Mocknet } from './blockchain/mocknet'



export const useAppStore = defineStore('app', () => {
  const network = ref('mocknet')
  const adapter = ref(createAdapter())
  
  watch(network, () => {
    adapter.value = createAdapter()
  })

  return { network, adapter }
})

function createAdapter(): ChainAdapter {
  const aldea = new Aldea('http://localhost:4000')
  return new Mocknet(aldea)
}