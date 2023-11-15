<template>
  <div>
    <h2>Latest Blocks</h2>
    <div v-if="isStreaming">31 block / sec</div>

    <ul class="space-y-2">
      <li v-for="block of blocks">
        <StreamingBlockListItem :item="block" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import StreamingBlockListItem from './lists/StreamingBlockListItem.vue'

defineProps<{
  isStreaming: boolean;
}>()

const blocks = new Array(10)
blocks.fill({
  "id":"7b3ce5a9067432ed3763ebcd1edfab3ef150f09fbc1e1d4a5160d3f0d7ce79c4",
  "sig":"5c2da258ec7af656122d270e472f115fc41a47682de6ff1465f4bb3ba78c066961b0fc6ff01a083c86b6da7028a7500f5258cd345d69430b2a6cc37eee41980f",
  "created_at":1700055698485,
  "height":80675,
  "creator":"868aba083f424b92d1d6467db06d620448fc47efca85c544e08b30473bb320b4",
  "prev_block_id":"f76e170cba450546d0d2c18209fd5072cb35c87b2d9a78f76fe7304c21c4e3f7",
  "tx_root":"0000000000000000000000000000000000000000000000000000000000000000",
  "state_root":"0000000000000000000000000000000000000000000000000000000000000000",
  "state_commit":"544c297daf78f7b2dddc5cbd41830d95cdc9a0807295fb2c0b8be643b6b81b56"
})
</script>