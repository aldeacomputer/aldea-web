<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <span class="text-neutral-400">{{ callName }}</span>
    <template #drop-down>
      <p>Decoded args will go here</p>
      <p>Decoded args will go here</p>
      <p>Decoded args will go here</p>
    </template>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { OpCode } from '@aldea/sdk'
import { NewInstruction, CallInstruction, ExecInstruction, ExecFuncInstruction } from '@aldea/core/instructions'
import BaseInstruction from './BaseInstruction.vue'

const props = defineProps<{
  idx: number;
  instruction: NewInstruction | CallInstruction | ExecInstruction | ExecFuncInstruction;
}>()

const callName = computed(() => {
  switch (props.instruction.opcode) {
    case OpCode.NEW: return 'new Badge()'
    case OpCode.CALL: return 'Badge#instanceMethod()'
    case OpCode.EXEC: return 'Badge#staticMethod()'
    case OpCode.EXECFUNC: return 'someFunction()'
  }
})
</script>