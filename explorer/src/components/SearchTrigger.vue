<template>
  <div
    class="flex items-center border-b pr-4 rounded-sm group transition-colors cursor-pointer"
    :class="{
      'bg-layer-01 border-gray-70 hover:bg-layer-02 hover:border-gray-60': onHome,
      'bg-layer-02 border-gray-60 hover:bg-layer-03 hover:border-gray-50': !onHome,
    }"
    @click="showSearch">

    <div
      class="flex items-center justify-center shrink-0"
      :class="onHome ? 'w-12 h-12' : 'w-9 h-9 md:w-10 md:h-10'">
      <CaSearch class="text-secondary group-hover:text-primary transition-colors" />
    </div>

    <div class="flex-auto font-mono text-14 text-placeholder group-hover:text-gray-50 transition-colors whitespace-nowrap overflow-hidden">
      <span class="inline sm:hidden">Search...</span>
      <span class="hidden sm:inline">Jig / Transaction / Package / Address</span>
    </div>

    <div class="hidden md:block pl-4 shrink-0">
      <span class="text-12 md:text-14 tracking-widest text-blue-40 group-hover:text-blue-30 transition-colors">{{ trigger }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { CaSearch } from '@kalimahapps/vue-icons'
import { useSearchStore } from '../stores/search'

const search = useSearchStore()

defineProps<{
  onHome?: boolean;
}>()

const trigger = computed(() => {
  return search.isMac ? '⌘K' : '^K'
})

function showSearch() {
  search.$patch({ show: true })
}

function onKeyDown(e: KeyboardEvent) {
  if ((search.isMac ? e.metaKey : e.ctrlKey) && e.key === 'k') {
    showSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>