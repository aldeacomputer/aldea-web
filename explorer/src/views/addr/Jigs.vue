<template>
  <div v-if="jigs?.data.length">
    <ul class="space-y-2">
      <li v-for="output of jigs.data">
        <OutputListItem :item="output" />
      </li>
    </ul>

    <CursorPagination
      class="mt-8"
      :meta="jigs.meta"
      @prev="router.push({ query: { before: $event } })"
      @next="router.push({ query: { after: $event } })"
      v-if="jigs.meta" />
  </div>

  <p class="p-4 text-helper text-center" v-else>
    This address has no jigs.
  </p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'
import OutputListItem from '../../components/lists/OutputListItem.vue'
import CursorPagination from '../../components/CursorPagination.vue'

const store = useAppStore()
const route = useRoute()
const router = useRouter()

const jigs = ref<DataOf<JigData>>(await loadJigs())

async function loadJigs(): Promise<DataOf<JigData>> {
  const opts = { ...route.query, limit: 4 }
  return store.adapter.getAddrJigs(route.params.id as string, opts)
}

watch(() => route.params.id, async () => {
  if (typeof route.name === 'string' && /^addr/.test(route.name)) {
    jigs.value = await loadJigs()
    window.scrollTo({ top: 0 })
  }
})

watch(() => route.query, async () => {
  if (typeof route.name === 'string' && /^addr/.test(route.name)) {
    jigs.value = await loadJigs()
    window.scrollTo({ top: 0 })
  }
})
</script>