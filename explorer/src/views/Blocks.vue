<template>
  <PageHeader
    title="Blocks"
    class="mb-10">
  </PageHeader>

  <ul class="space-y-2">
    <li v-for="block of blocks.data">
      <BlockListItem :item="block" />
    </li>
  </ul>

  <CursorPagination
    class="mt-8"
    :meta="blocks.meta"
    @prev="router.push({ query: { before: $event } })"
    @next="router.push({ query: { after: $event } })"
    v-if="blocks.meta" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import BlockListItem from '../components/lists/BlockListItem.vue'
import CursorPagination from '../components/CursorPagination.vue'

const router = useRouter()
const route = useRoute()
const store = useAppStore()

useHead({
  title: 'Blocks'
})

const blocks = ref<DataOf<BlockData>>(await loadBlocks())

watch(() => route.query, async () => {
  if (route.name === 'blocks') {
    blocks.value = await loadBlocks()
  }
})

async function loadBlocks(): Promise<DataOf<BlockData>> {
  const opts = { ...route.query, limit: 50 }
  return store.adapter.getBlocks(opts)
}
</script>