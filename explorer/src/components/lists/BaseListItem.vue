<template>
  <div
    class="bg-layer-01"
    :class="{'group hover:bg-layer-02 transition-colors cursor-pointer': hasDropDown}"
    @click="toggleOpen">

    <div class="flex items-center justify-between h-12">
      <div class="flex flex-shrink-0 items-center justify-center w-12">
        <component :is="icon" />
      </div>
      <div class="flex-auto">
        <slot></slot>
      </div>
      <div class="flex flex-shrink-0 items-center justify-center w-12" v-if="hasDropDown">
          <component :is="chevronIcon" />
      </div>
    </div>

    <div
      class="x-transition-all x-duration-500 overflow-hidden"
      :class="isOpen ? 'max-h-max visible' : 'max-h-0 invisible'">
      <div class="px-4 pb-4">
        <div class="p-4 bg-gray-100 rounded-sm">
          <slot name="drop-down"></slot>  
        </div>
      </div>
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