<template>
  <li>
    <a
      class="text-secondary underline decoration-secondary/0 hover:text-primary hover:decoration-primary transition-colors cursor-pointer"
      @click="$emit('click', $event)">
      <slot />
    </a>
  </li>
</template>

<script setup lang="ts">
defineEmits<{
  click: [e: Event];
}>()
</script>