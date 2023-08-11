<template>
  <div class="w-full max-w-md space-y-6">
    <div>
      <h1 class="text-32 font-light">Ruh-oh... 404</h1>
      <p class="text-secondary">The page you are looking for can't be found. Try again&hellip;</p>
    </div>

    <div class="space-y-2">
      <SearchTrigger on-home />
      <NetworkSwitch on-home />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SearchTrigger from '../components/SearchTrigger.vue'
import NetworkSwitch from '../components/NetworkSwitch.vue'

useHead({
  title: 'Not found'
})
</script>