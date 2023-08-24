<template>
  <AppHeader class="fixed top-0 left-0 right-0 z-40 shadow-md" />

  <div class="pt-14 md:pt-20 lg:pt-28 md:pb-4 lg:pb-12">
    <main class="px-4 py-6 sm:p-6 md:px-8 lg:px-10">
      <div class="max-w-6xl mx-auto">
        <slot></slot>
      </div>
    </main>
  </div>

  <SearchModal v-if="search.show" />
  <AppFooter />
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/search'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import SearchModal from '../components/SearchModal.vue'

const search = useSearchStore()
</script>
