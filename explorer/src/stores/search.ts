import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAppStore } from './app'

const STORAGE_KEY = '__recent_search'
const MAX_STORED_RESULTS = 10
const VALID_ADDR_REGEX = /^addr(_\w+)?1[a-z0-9]{38}$/
const VALID_ID_REGEX = /^[a-fA-F0-9]{64}(_\d+)?$/

const persitedResultsStr = localStorage.getItem(STORAGE_KEY)
const persitedResults: Record<string, SearchResult[]> =
  typeof persitedResultsStr === 'string' ? JSON.parse(persitedResultsStr) : {}

export const useSearchStore = defineStore('search', () => {
  const router = useRouter()
  const store = useAppStore()

  const isMac = navigator.userAgent.indexOf('Mac OS X') > -1
  const show = ref(false)
  const term = ref('')
  const errorTerm = ref('')

  const keyedResults = reactive<Record<string, SearchResult[]>>(persitedResults)
  const recentResults = computed(() => keyedResults[store.network] || [])

  const isLoading = ref(false)
  const isBlank = computed(() => !term.value.length)
  const isError = computed(() => errorTerm.value.length > 0 && errorTerm.value === term.value)
  const isValid = computed(() => VALID_ID_REGEX.test(term.value) || VALID_ADDR_REGEX.test(term.value))

  async function lookup() {
    if (isValid.value && !isError.value) {
      errorTerm.value = ''
      isLoading.value = true
      if (/^addr/.test(term.value))       { await lookupAddress() }
      else if (/_\d+$/.test(term.value))  { await lookupJig() }
      else                                { await multiLookup() }
      isLoading.value = false
    }
  }

  async function lookupAddress() {
    goto({ type: 'addr', value: term.value })
  }

  async function lookupJig() {
    try {
      await store.adapter.getJig(term.value)
      goto({ type: 'jig', value: term.value })
    } catch(e) {
      errorTerm.value = term.value
    }
  }

  async function multiLookup() {
    try {
      const res = await store.adapter.lookupById(term.value)
      goto({ type: res.type, value: term.value })
    } catch(e) {
      errorTerm.value = term.value
    }
  }

  function goto(res: SearchResult) {
    push(res)
    if (res.type === 'addr') {
      router.push({ name: 'addr', params: { addr: res.value }})
    } else {
      router.push({ name: res.type, params: { id: res.value }})
    }
    show.value = false
    term.value = ''
  }

  function push(res: SearchResult) {
    // Set default
    keyedResults[store.network] ||= []

    // Filter dupes
    keyedResults[store.network]
      .filter(r => r.type === res.type && r.value === res.value)
      .map(d => keyedResults[store.network].indexOf(d))
      .forEach(i => keyedResults[store.network].splice(i, 1))
    
    // Prepend && slice
    keyedResults[store.network].unshift(res)
    if (keyedResults[store.network].length >= MAX_STORED_RESULTS) {
      keyedResults[store.network].length = MAX_STORED_RESULTS
    }

    // Persist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keyedResults))
  }

  function clear() {
    keyedResults[store.network] ||= []
    keyedResults[store.network] = []
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keyedResults))
  }

  return { isMac, show, term, errorTerm, recentResults, isBlank, isError, isValid, isLoading, lookup, goto, clear }
})
