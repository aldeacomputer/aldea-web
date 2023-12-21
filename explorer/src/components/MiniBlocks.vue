<template>
  <div class="flex justify-between items-center py-2 h-16">
    <h2 class="text-24 font-light">Latest Blocks</h2>
    <RouterLink to="/blocks" class="link flex items-center gap-1">
      <span>All blocks</span>
      <CaArrowRight />
    </RouterLink>
  </div>
  <div class="overflow-hidden">
    <ul class="space-y-2">
      <li v-for="block of blocks">
        <StreamingBlockListItem :item="block" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CaArrowRight } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import StreamingBlockListItem from './lists/StreamingBlockListItem.vue'

const store = useAppStore()

const blocks = ref<Array<BlockData>>(await loadBlocks())

async function loadBlocks(): Promise<BlockData[]> {
  return store.adapter.getBlocks({ limit: 10 })
}
</script>
