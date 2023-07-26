<template>
  <div class="flex items-center gap-4">
    <RouterLink
      class="link"
      v-for="link of links"
      :to="link.path">
      {{ link.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
const links = [
  { path: "/tx/1", label: "Transaction" },
  { path: "/pkg/1", label: "Package" },
  { path: "/jig/1", label: "Jig" },
  { path: "/address/1", label: "Address" },
]
</script>