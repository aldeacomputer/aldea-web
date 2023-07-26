<template>
  <div
    class="bg-neutral-800 overflow-hidden"
    :class="{'group hover:bg-neutral-700 transition-colors cursor-pointer': hasDropDown}"
    @click="toggleOpen">

    <div class="flex items-center justify-between h-12">
      <div class="flex flex-shrink-0 items-center justify-center w-12">
        <component :is="icon" />
      </div>
      <div class="flex-auto">
        <slot></slot>
      </div>
      <div class="flex flex-shrink-0 items-center justify-center w-12">
          <component :is="chevronIcon" v-if="hasDropDown" />
        </div>
    </div>

    <div
      class="transition-all duration-500 overflow-hidden"
      :class="isOpen ? 'max-h-64 visible' : 'max-h-0 invisible'">
      <slot name="drop-down"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CaChevronUp, CaChevronDown } from '@kalimahapps/vue-icons'

defineProps<{
  icon: any;
}>()

const slots = defineSlots<{
  default(): any;
  'drop-down'(): any
}>()

const isOpen = ref(false)

const hasDropDown = computed(() => {
  return !!slots['drop-down']
})

const chevronIcon = computed(() => {
  return isOpen.value ? CaChevronUp : CaChevronDown
})

function toggleOpen() {
  if (hasDropDown.value) {
    isOpen.value = !isOpen.value
  }
}
</script>