<template>
  <component
    :is="type"
    class="inline-flex items-center h-16 px-4 gap-4 text-white bg-sky-800 hover:bg-sky-700 transition-colors"
    @click="$emit('click', $event)">
    <span class="text-14 whitespace-nowrap"><slot></slot></span>
    <component :is="icon" v-if="icon" />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'link';
  icon?: any;
}>(), {
  type: 'button'
})

defineEmits<{
  click: [e: Event];
}>()
</script>