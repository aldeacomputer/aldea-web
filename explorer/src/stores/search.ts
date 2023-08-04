import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAppStore } from './app'

const STORAGE_KEY = 'recent_search_results'
const MAX_STORED_RESULTS = 10
const VALID_ADDR_REGEX = /^addr(_\w+)?1[a-z0-9]{38}$/
const VALID_ID_REGEX = /^[a-fA-F0-9]{64}(_\d+)?$/

const persitedResults = localStorage.getItem(STORAGE_KEY)
const defaultResults: SearchResult[] = typeof persitedResults === 'string' ?
  JSON.parse(persitedResults) :
  []

export const useSearchStore = defineStore('search', () => {
  const router = useRouter()
  const store = useAppStore()

  const isMac = navigator.userAgent.indexOf('Mac OS X') > -1
  const show = ref(false)
  const term = ref('')
  const errorTerm = ref('')

  const recentResults = ref<SearchResult[]>(defaultResults)

  const isLoading = ref(false)
  const isBlank = computed(() => !term.value.length)
  const isError = computed(() => errorTerm.value.length > 0 && errorTerm.value === term.value)
  const isValid = computed(() => VALID_ID_REGEX.test(term.value) || VALID_ADDR_REGEX.test(term.value))

  async function lookup() {
    if (isValid.value) {
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
    persist(res)
    if (res.type === 'addr') {
      router.push({ name: 'addr', params: { addr: res.value }})
    } else {
      router.push({ name: res.type, params: { id: res.value }})
    }
    show.value = false
    term.value = ''
  }

  function persist(res: SearchResult) {
    // Filter dupes
    recentResults.value
      .filter(r => r.type === res.type && r.value === res.value)
      .map(d => recentResults.value.indexOf(d))
      .forEach(i => recentResults.value.splice(i, 1))
    
    // Prepend && slice
    recentResults.value.unshift(res)
    if (recentResults.value.length >= MAX_STORED_RESULTS) {
      recentResults.value.length = MAX_STORED_RESULTS
    }

    // Persist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentResults.value))
  }

  function clear() {
    recentResults.value = []
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentResults.value))
  }

  return { isMac, show, term, errorTerm, recentResults, isBlank, isError, isValid, isLoading, lookup, goto, clear }
})
