<template>
  <ToolTip :show="showMessage">
    <div class="flex items-center gap-1" :class="{'@container': responsive && !short}">
      <component
        :is="component"
        :to="to"
        class="font-mono"
        :class="{
          'link underline': isLink,
          'text-14': size === 'sm',
          'text-16': size === 'md',
          'text-18 lg:text-20': size === 'lg',
        }">
        <span
          class="@[582px]:hidden whitespace-nowrap"
          v-if="responsive || short">
          {{ shortValue }}
        </span>
        <span
          class="break-all"
          :class="{'hidden @[582px]:inline': responsive}"
          v-if="!short">
          {{ value }}
        </span>
      </component>
      <CopyButton :size="size" :value="value" class="shrink-0" @copied="showToolTip" />
    </div>
    <template #content>
      <div class="flex items-center gap-2">
        <CaCheckmarkOutline class="text-16 text-success" />
        <span>Copied!</span>
      </div>
    </template>
  </ToolTip>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouteLocationRaw } from 'vue-router'
import { CaCheckmarkOutline } from '@kalimahapps/vue-icons'
import CopyButton from './CopyButton.vue'
import ToolTip from './ToolTip.vue'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw;
  responsive?: boolean;
  short?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value: string;
}>(), {
  responsive: false,
  short: false,
  size: 'md'
})

const showMessage = ref(false)

const component = computed(() => {
  return isLink.value ? RouterLink : 'span'
})

const isLink = computed(() => {
  return typeof props.to !== 'undefined'
})

const shortValue = computed(() => {
  if (/^addr/.test(props.value)) {
    return `${props.value.slice(0, 10)}…${props.value.slice(-7)}`
  } else if (/_\d+$/.test(props.value)) {
    const n = Math.max(0, props.value.length - 64)
    return `${props.value.slice(0, 7)}…${props.value.slice(-(7+n))}`
  } else if (props.value.length >= 20) {
    return `${props.value.slice(0, 7)}…${props.value.slice(-7)}`
  } else {
    return props.value
  }
})

function showToolTip() {
  showMessage.value = true
  setTimeout(() => showMessage.value = false, 5000)
}
</script>