<template>
  <div class="relative min-h-screen pt-14 pb-48 md:py-20 lg:py-28">
    <AppHeader class="fixed top-0 left-0 right-0 z-40 border-b border-black/10" />
    <main class="px-4 py-6 sm:p-6 md:px-8 lg:px-10">
      <div class="max-w-6xl mx-auto">
        <slot></slot>
      </div>
    </main>
    <AppFooter class="absolute bottom-0 left-0 right-0 border-t border-black/10" />
  </div>

  <SearchModal v-if="search.show" />
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/search'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import SearchModal from '../components/SearchModal.vue'

const search = useSearchStore()
</script>
