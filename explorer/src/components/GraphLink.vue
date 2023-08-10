<template>
  <div class="md:flex items-center gap-2 space-y-0.5 md:space-y-0">
    <div :class="{
      'md:w-16 text-14': size === 'sm',
      'md:w-20 text-16': size !== 'sm',
    }">
    {{ label }}
  </div>
    <Copyable class="flex-auto" :to="to" :size="size" :responsive="responsive" :short="short" :value="value" />
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import Copyable from './Copyable.vue'

withDefaults(defineProps<{
  to: RouteLocationRaw;
  label: string;
  value: string;
  responsive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  short?: boolean;
}>(), {
  responsive: false,
  size: 'md',
  short: false,
})
</script>