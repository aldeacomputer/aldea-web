<template>
  <PageHeader
    title="Blocks"
    class="mb-10">
  </PageHeader>

  <ul class="space-y-2">
    <li v-for="block of blocks">
      <BlockListItem :item="block" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import BlockListItem from '../components/lists/BlockListItem.vue'
//import CursorPagination from '../components/CursorPagination.vue'

const route = useRoute()
const store = useAppStore()

useHead({
  title: 'Blocks'
})

const blocks = ref<BlockData[]>(await loadBlocks())

watch(() => route.query, async () => {
  if (route.name === 'blocks') {
    blocks.value = await loadBlocks()
  }
})

async function loadBlocks(): Promise<BlockData[]> {
  return store.adapter.getBlocks({ limit: 50 })
}
</script>