<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink :icon="CaCode">
      <span class="pr-2 text-secondary text-sm">{{ callName }}</span>
    </ShortLink>
    
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
//import { Abi } from '@aldea/core/abi'
import { NewInstruction, CallInstruction, ExecInstruction, ExecFuncInstruction } from '@aldea/core/instructions'
import { CaCode } from '@kalimahapps/vue-icons'
//import * as keys from '../../injection-keys'
//import { useAppStore } from '../../stores/app'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: NewInstruction | CallInstruction | ExecInstruction | ExecFuncInstruction;
}>()

//const store = useAppStore()
//const abi = ref<Abi>()
//const tx = inject(keys.tx)

const callName = computed(() => {
  // TODO - figure out correct class/method/function names from referrenced ABI
  // see how VM does this
  //const reffed = tx!.value!.instructions[props.instruction.idx]
  switch (props.instruction.opcode) {
    case OpCode.NEW: return 'new Badge()'
    case OpCode.CALL: return 'Badge#instanceMethod()'
    case OpCode.EXEC: return 'Badge#staticMethod()'
    case OpCode.EXECFUNC: return 'someFunction()'
  }
})
</script>