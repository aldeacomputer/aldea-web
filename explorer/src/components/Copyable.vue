<template>
  <div class="flex items-center gap-1" :class="{'@container': responsive}">
    <component
      :is="component"
      :to="to"
      :class="{
        'link underline': isLink,
        'text-14': size === 'sm',
        'text-16': size === 'md',
        'text-18 lg:text-20': size === 'lg',
      }">
      <span class="@lg:hidden whitespace-nowrap" v-if="responsive">{{ shortValue }}</span>
      <span class="break-all" :class="{'hidden @lg:inline': responsive}">{{ value }}</span>
    </component>
    <CopyButton :size="size" :value="value" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouteLocationRaw } from 'vue-router'
import CopyButton from './CopyButton.vue'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw;
  responsive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value: string;
}>(), {
  responsive: false,
  size: 'md'
})

const component = computed(() => {
  return isLink.value ? RouterLink : 'span'
})

const isLink = computed(() => {
  return typeof props.to !== 'undefined'
})

const shortValue = computed(() => {
  if (/^addr/.test(props.value)) {
    return `${props.value.slice(0, 10)}…${props.value.slice(-7)}`
  } else {
    return `${props.value.slice(0, 7)}…${props.value.slice(64-7)}`
  }
})
</script>