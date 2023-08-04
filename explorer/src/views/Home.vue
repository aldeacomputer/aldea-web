<template>
  <div class="w-full max-w-md space-y-2">
    <div>
      <img src="/aldea-ex-logo.svg" width="350" alt="Aldea Explorer" />
    </div>
    
    <SearchTrigger on-home />
  </div>
</template>

<script setup lang="ts">
import SearchTrigger from '../components/SearchTrigger.vue'
</script>