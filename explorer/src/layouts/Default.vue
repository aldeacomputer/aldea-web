<template>
  <div class="pt-14 md:pt-20 lg:pt-28">
    <AppHeader class="fixed top-0 left-0 right-0 z-10" />
    <main class="px-4 py-6 sm:p-6 md:px-8 lg:px-10">
      <div class="max-w-6xl mx-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
</script>
