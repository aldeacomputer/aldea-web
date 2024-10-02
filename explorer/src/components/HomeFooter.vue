<template>
  <footer class="flex items-center gap-3">
    <RouterLink to="/">
      <img src="/aldea-iso.svg" width="39" alt="Aldea Explorer" />
    </RouterLink>
    <div class="w-60">
      <p class="text-14">
        We are creating the best blockchain for app developers.
        <a
          class="inline-flex items-center link"
          href="https://aldeacomputer.com"
          target="_blank">
          <span class="underline">Find out more</span>
          <CaArrowUpRight class="text-16" />
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CaArrowUpRight } from '@kalimahapps/vue-icons'
</script>
