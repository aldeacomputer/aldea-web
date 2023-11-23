<template>
  <div>
    <div class="flex justify-between items-center py-2 h-16">
      <h2 class="text-24 font-light">Latest Transactions</h2>
      <div class="flex items-center" v-if="isStreaming">
        <span class="text-28 pr-2 text-blue-40">{{ stat }}</span>
        <span class="font-mono text-secondary">tx/sec</span>
      </div>
    </div>
    <div class="overflow-hidden" ref="wrap">
      <ul class="space-y-2" ref="list">
        <li v-for="tx of txs">
          <StreamingTxListItem :item="tx" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { bus } from '../bus'
import StreamingTxListItem from './lists/StreamingTxListItem.vue'

const store = useAppStore()

defineProps<{
  isStreaming: boolean;
}>()

const wrap = ref<HTMLElement>()
const list = ref<HTMLElement>()
const isAnimating = ref<boolean>(false)

const txs = ref<Array<TxDataMin>>(await loadTxs())
const stat = ref<number>(txs.value.length)

async function loadTxs(): Promise<TxDataMin[]> {
  return store.adapter.getTxs({ limit: 10 })
}

onMounted(() => {
  bus.on('tx', addEvent)
  bus.on('stats', setStats)

  list.value?.addEventListener('animationend', () => {
    if (txs.value.length >= 10) txs.value.pop()
    list.value!.classList.remove('animate-drop-in')
    wrap.value!.style.removeProperty('height')
    isAnimating.value = false
  })
})

function addEvent(tx: any): void {
  if (!isAnimating.value) {
    isAnimating.value = true
    wrap.value!.style.setProperty('height', `${wrap!.value?.offsetHeight}px`)
    txs.value.unshift(tx)

    nextTick(() => {
      list.value!.classList.add('animate-drop-in')
    })
  }
}

function setStats({ tps }: any): void {
  stat.value = tps
}
</script>