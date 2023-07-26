<template>
  <div
    class="flex items-center bg-neutral-800 overflow-hidden"
    :class="{'group hover:bg-neutral-700 transition-colors cursor-pointer': hasDropDown}"
    @click="toggleOpen">
    <div class="flex flex-shrink-0 items-center justify-center self-stretch w-12 sm:w-14 bg-neutral-700 group-hover:bg-neutral-600 transition-colors">
      <span class="font-mono text-14 text-neutral-400 group-hover:text-neutral-300 transition-colors">
        <span class="opacity-60">#</span>
        <span>{{ idx }}</span>
      </span>
    </div>
    <div class="flex-auto font-mono text-14">
      <div class="flex items-center justify-between h-14 pl-6 gap-10">
        <div class="flex flex-auto items-center justify-between gap-2 md:flex-grow-0 md:w-36">
          <span>{{ opName }}</span>
          <span class="flex items-center text-neutral-400 gap-1" v-if="hasRef">
            <CaArrowUpLeft class="text-neutral-500" />
            <span>
              <span class="opacity-60">#</span>
              <span>{{ instruction.idx }}</span>
            </span>
          </span>
        </div>
        <div class="hidden md:block flex-auto">
          <slot></slot>
        </div>
        <div class="flex flex-shrink-0 items-center justify-center self-stretch w-12 sm:w-14">
          <component :is="chevronIcon" v-if="hasDropDown" />
        </div>
      </div>
      <div
        class="transition-all duration-500 overflow-hidden"
        :class="isOpen ? 'max-h-64 visible' : 'max-h-0 invisible'"
        v-if="hasDropDown">
        <div class="px-4 pb-4">
          <div class="p-4 bg-neutral-900 rounded-sm">
            <slot name="drop-down"></slot>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Instruction, OpCode } from '@aldea/sdk'
import { CaArrowUpLeft, CaChevronUp, CaChevronDown } from '@kalimahapps/vue-icons'

interface InstructionWithRef extends Instruction {
  idx?: number
} 

const props = defineProps<{
  idx: number;
  instruction: InstructionWithRef;
}>()

const slots = defineSlots<{
  default(): any;
  'drop-down'(): any
}>()

const isOpen = ref(false)

const opName = computed(() => {
  return OpCode[props.instruction.opcode]
})

const hasRef = computed(() => {
  return typeof props.instruction.idx === 'number'
})

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