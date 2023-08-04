<template>
  <header class="flex items-center h-14 lg:h-16 px-4 gap-8 bg-layer-01">
    <div class="flex-grow-0 flex-shrink-0 w-20">
      <RouterLink to="/">
        <img src="/aldea-logo.svg" width="74" alt="Aldea Explorer" />
      </RouterLink>
    </div>
    <div class="flex-1">
      <div class="w-full max-w-md mx-auto">
        <SearchTrigger />
      </div>
    </div>
    <div class="hidden md:flex flex-grow-0 flex-shrink-0 w-20">

    </div>
  </header>
</template>

<script setup lang="ts">
import SearchTrigger from '../components/SearchTrigger.vue'
</script>