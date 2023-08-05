<template>
  <div v-if="tx && txd">
    <div class="md:grid grid-cols-2 gap-8 space-y-8 md:space-y-0">
      <div>
        <h3 class="flex items-center mb-6 gap-2">
          <CaArrowDownRight class="text-emeral-200" />
          <span>Inputs</span>
        </h3>
        <ul class="space-y-2">
          <li v-for="input of inputs">
            <component :is="InputListItem" :item="input" />
          </li>
        </ul>
      </div>

      <div>
        <h3 class="flex items-center mb-6 gap-2">
          <CaArrowUpRight class="text-emeral-200" />
          <span>Outputs</span>
        </h3>
        <ul class="space-y-2">
          <li v-for="output of txd.outputs">
            <OutputListItem :item="output" />
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { LoadInstruction, LoadByOriginInstruction } from '@aldea/core/instructions'
import { Instruction, OpCode } from '@aldea/sdk'
import { CaArrowDownRight, CaArrowUpRight } from '@kalimahapps/vue-icons'
import * as keys from '../../injection-keys'
import InputListItem from '../../components/lists/InputListItem.vue'
import OutputListItem from '../../components/lists/OutputListItem.vue'

const tx = inject(keys.tx)
const txd = inject(keys.txd)

const inputs = computed(() => {
  const ins = tx?.value ? tx.value.instructions.filter(filterInput) : []
  return ins as Array<LoadInstruction | LoadByOriginInstruction>
})

function filterInput(i: Instruction): boolean {
  return i.opcode === OpCode.LOAD || i.opcode === OpCode.LOADBYORIGIN
}
</script>