<template>
  <div>
    <h2>Latest Transactions</h2>
    <div v-if="isStreaming">31 block / sec</div>

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

const blocks = new Array(10)
blocks.fill({
  "id":"7b3ce5a9067432ed3763ebcd1edfab3ef150f09fbc1e1d4a5160d3f0d7ce79c4",
  "size":"0.2 kB"
})
</script>