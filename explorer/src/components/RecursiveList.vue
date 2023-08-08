<template>
  <div>
    <h4 class="mb-2 text-16 font-semibold" v-if="title">{{ title }}</h4>
    <ul class="text-14 space-y-2">
      <li v-for="item of items">
        <a
          class="text-secondary underline decoration-secondary/0 hover:text-primary hover:decoration-primary transition-colors cursor-pointer"
          >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface ListItem {
  label: string;
  children?: ListItem[];
}

defineProps<{
  title?: string;
  items: ListItem[];
}>()
</script>