<template>
  <div v-if="tx">
    <div class="lg:grid grid-cols-2 gap-8 space-y-8 lg:space-y-0">
      <div>
        <h3 class="flex items-center mb-6 gap-2">
          <CaArrowDownRight class="text-emeral-200" />
          <span>Inputs</span>
        </h3>
        <ul class="space-y-2">
          <li v-for="input of inputs">
            <InputListItem :item="input" />
          </li>
        </ul>
      </div>

      <div>
        <h3 class="flex items-center mb-6 gap-2">
          <CaArrowUpRight class="text-emeral-200" />
          <span>Outputs</span>
        </h3>
        <ul class="space-y-2">
          <li v-for="output of outputs">
            <OutputListItem :item="output" />
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { Instruction, OpCode, instructions } from '@aldea/sdk'
import { CaArrowDownRight, CaArrowUpRight } from '@kalimahapps/vue-icons'
import { KEYS } from '../../constants'
import InputListItem from '../../components/lists/InputListItem.vue'
import OutputListItem from '../../components/lists/OutputListItem.vue'

const tx = inject(KEYS.tx)
//const inputs = inject(KEYS.txInputs)
const outputs = inject(KEYS.txOutputs)

const inputs = computed(() => {
  return tx?.value.instructions.filter(filterInput) as Array<instructions.LoadInstruction | instructions.LoadByOriginInstruction>
})

function filterInput(i: Instruction): boolean {
  return i.opcode === OpCode.LOAD || i.opcode === OpCode.LOADBYORIGIN
}
</script>