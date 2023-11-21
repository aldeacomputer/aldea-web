<template>
  <div class="h-screen px-4 py-6 flex flex-col">
    <div class="flex-auto flex flex-col items-center justify-center gap-10">
      <slot></slot>
    </div>
    
    <SearchModal v-if="search.show" />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/search'
import HomeFooter from '../components/HomeFooter.vue'
import SearchModal from '../components/SearchModal.vue'

const search = useSearchStore()
</script>
