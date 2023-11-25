<template>
  <div>
    <div class="flex justify-between items-center py-2 h-16">
      <h2 class="text-24 font-light">Latest Blocks</h2>
      <div class="flex items-center" v-if="isStreaming">
        <span class="text-28 pr-2 text-blue-40">{{ stat }}</span>
        <span class="font-mono text-secondary">block/sec</span>
      </div>
    </div>
    <div class="overflow-hidden" ref="wrap">
      <ul class="space-y-2" ref="list">
        <li v-for="block of blocks">
          <StreamingBlockListItem :item="block" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useAppStore } from '../stores/app'
import { bus } from '../bus'
import StreamingBlockListItem from './lists/StreamingBlockListItem.vue'

const store = useAppStore()

defineProps<{
  isStreaming: boolean;
}>()

const wrap = ref<HTMLElement>()
const list = ref<HTMLElement>()
const isAnimating = ref<boolean>(false)

const blocks = ref<Array<BlockData>>(await loadBlocks())
const stat = ref<number>(blocks.value.length)

async function loadBlocks(): Promise<BlockData[]> {
  const { data } = await store.adapter.getBlocks({ limit: 10 })
  return data
}

onMounted(() => {
  bus.on('block', addEvent)
  bus.on('stats', setStats)

  list.value?.addEventListener('animationend', () => {
    if (blocks.value.length >= 10) blocks.value.pop()
    list.value!.classList.remove('animate-drop-in')
    wrap.value!.style.removeProperty('height')
    isAnimating.value = false
  })
})

function addEvent(block: any): void {
  if (!isAnimating.value) {
    isAnimating.value = true
    wrap.value!.style.setProperty('height', `${wrap!.value?.offsetHeight}px`)
    blocks.value.unshift(block)

    nextTick(() => {
      list.value!.classList.add('animate-drop-in')
    })
  }
}

function setStats({ bps }: any): void {
  stat.value = bps
}
</script>
