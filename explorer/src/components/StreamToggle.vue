<template>
  <div>
    <input
      type="checkbox"
      :checked="modelValue"
      @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).checked)" />
    <label> turn this into a toggle? - {{ modelValue }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>()

defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>()
</script>