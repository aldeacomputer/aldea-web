import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { ChainAdapter } from './blockchain/adapter'
import { createMocknetAdapter } from './blockchain/mocknet'
//import { Backend } from './blockchain/backend'
import { useRouter } from 'vue-router';

const STORAGE_KEY = '__network'

interface Network {
  id: string;
  label: string;
  init: () => ChainAdapter;
}

const networks: Network[] = [
  //{
  //  id: 'devnet',
  //  label: 'Devnet',
  //  init: () => createMocknetAdapter('https://devnet.aldea.computer')
  //},
  {
    id: 'alphanet',
    label: 'Devnet (JS)',
    init: () => createMocknetAdapter('https://node.aldea.computer')
  },
  {
    id: 'mocknet',
    label: 'Mocknet',
    init: () => createMocknetAdapter('http://localhost:4000')
  }
]

const networkId = sessionStorage.getItem(STORAGE_KEY) || 'alphanet'
const defaultNetwork = networks.find(n => n.id === networkId)!

export const useAppStore = defineStore('app', () => {
  const router = useRouter()

  const network = ref(defaultNetwork.id)
  const adapter = ref(defaultNetwork.init())

  watch(network, (id) => {
    const net = networks.find(n => n.id === id)!
    adapter.value = net.init()
    sessionStorage.setItem(STORAGE_KEY, id)
    router.push({ name: 'home' })
  })

  return { networks, network, adapter }
})
