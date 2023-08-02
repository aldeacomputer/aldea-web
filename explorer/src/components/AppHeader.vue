<template>
  <header class="flex items-center h-14 lg:h-16 px-4 gap-8 bg-layer-01">
    <div class="flex-grow-0 flex-shrink-0 w-20">
      <RouterLink to="/">
        <img src="/aldea-logo.svg" width="74" alt="Aldea Computer" />
      </RouterLink>
    </div>
    <div class="flex-1">
      <div class="relative max-w-3xl mx-auto">
        <input type="text" class="w-full h-8 lg:h-12 pl-9 lg:pl-12 pr-4 text-sm lg:text-base bg-layer-02 rounded-sm outline-none">
        <div class="absolute top-0 left-0 bottom-0 w-9 lg:w-12 flex items-center justify-center">
          <CaSearch class="text-secondary" />
        </div>
      </div>
    </div>
    <div class="hidden md:flex flex-grow-0 flex-shrink-0 w-20">

    </div>
  </header>
</template>

<script setup lang="ts">
import { CaSearch } from '@kalimahapps/vue-icons'
</script>