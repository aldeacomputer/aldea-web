<template>
  <div>
    <div class="flex justify-between items-center py-2 h-16">
      <h2 class="text-24 font-light">Latest Transactions</h2>
      <div class="flex items-center" v-if="isStreaming"><p class="text-28 pr-2 text-blue-40">31</p><p class="font-mono text-secondary">block/sec</p></div>
    </div>
    <ul class="space-y-2">
      <li v-for="block of blocks">
        <StreamingTxListItem :item="block" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import StreamingTxListItem from './lists/StreamingTxListItem.vue'

defineProps<{
  isStreaming: boolean;
}>()

const blocks = new Array(5)
blocks.fill({
  "id":"7b3ce5a9067432ed3763ebcd1edfab3ef150f09fbc1e1d4a5160d3f0d7ce79c4",
  "size":"0.2 kB"
})
</script>