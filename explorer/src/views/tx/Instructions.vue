<template>
  <div v-if="tx">
    <p class="text-14 mb-2">An instruction is a unit of code that performs a specific task.</p>
    <ul class="space-y-2">
      <li v-for="instruction, i of tx?.instructions">
        <component :is="componentFor(instruction)" :idx="i" :instruction="instruction" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Instruction, OpCode } from '@aldea/sdk'
import { KEYS } from '../../constants'
import ImportInstruction from '../../components/instructions/ImportInstruction.vue'
import LoadInstruction from '../../components/instructions/LoadInstruction.vue'
import CallInstruction from '../../components/instructions/CallInstruction.vue'
import LockInstruction from '../../components/instructions/LockInstruction.vue'
import DeployInstruction from '../../components/instructions/DeployInstruction.vue'
import SignInstruction from '../../components/instructions/SignInstruction.vue'
import BlankInstruction from '../../components/instructions/BlankInstruction.vue'

const tx = inject(KEYS.tx)

function componentFor(instruction: Instruction) {
  switch (instruction.opcode) {
    case OpCode.IMPORT:
      return ImportInstruction
    case OpCode.LOAD:
    case OpCode.LOADBYORIGIN:
      return LoadInstruction
    case OpCode.NEW:
    case OpCode.CALL:
    case OpCode.EXEC:
      return CallInstruction
    case OpCode.LOCK:
      return LockInstruction
    case OpCode.DEPLOY:
      return DeployInstruction
    case OpCode.SIGN:
    case OpCode.SIGNTO:
      return SignInstruction
    default:
      return BlankInstruction
  }
}
</script>