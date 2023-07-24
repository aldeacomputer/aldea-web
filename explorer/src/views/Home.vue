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
  { path: "/tx", label: "Transaction" },
  { path: "/pkg", label: "Package" },
  { path: "/jig", label: "Jig" },
  { path: "/addr", label: "Address" },
]
</script>