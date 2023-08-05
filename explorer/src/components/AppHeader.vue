<template>
  <header class="flex items-center h-14 lg:h-16 px-4 gap-4 lg:gap-8 bg-layer-01">
    <div class="flex items-center gap-4 shrink-0 lg:w-1/3">
      <RouterLink to="/">
        <img src="/aldea-logo.svg" width="74" alt="Aldea Explorer" />
      </RouterLink>
      <NetworkSwitch class="hidden lg:block" />
    </div>
    <div class="flex-auto flex justify-end lg:justify-center lg:w-1/3">
      <div class="w-full max-w-md">
        <SearchTrigger />
      </div>
    </div>
    <div class="hidden w-1/3 lg:block">

    </div>
  </header>
</template>

<script setup lang="ts">
import SearchTrigger from '../components/SearchTrigger.vue'
import NetworkSwitch from './NetworkSwitch.vue'
</script>