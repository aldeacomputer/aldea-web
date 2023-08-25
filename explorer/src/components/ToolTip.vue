<template>
  <Popper arrow placement="top">
    <slot />
    <template #content="props">
      <slot name="content" v-bind="props" />
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from 'vue3-popper'
</script>

<style>
:root {
  --popper-theme-background-color: #393939;
  --popper-theme-background-color-hover: #393939;
  --popper-theme-text-color: #f4f4f4;
  --popper-theme-border-style: none;
  --popper-theme-border-radius:	0.125rem;
  --popper-theme-padding:	0.5rem 1rem;
  --popper-theme-box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.popper {
  @apply max-w-[220px] text-14 text-center;
}
</style>