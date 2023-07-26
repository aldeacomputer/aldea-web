<template>
  <div>
    <div class="md:grid grid-cols-2 gap-8">
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
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaArrowDownRight, CaArrowUpRight } from '@kalimahapps/vue-icons'
import { LoadInstruction, LoadByOriginInstruction } from '@aldea/core/instructions'
import { OpCode } from '@aldea/sdk'
import { useTxStore } from '../../stores/tx.ts'
import InputListItem from '../../components/lists/InputListItem.vue'

const $tx = useTxStore()

const inputs = computed(() => {
  return $tx.currentTx!.instructions.filter(i => {
    return i.opcode === OpCode.LOAD || i.opcode === OpCode.LOADBYORIGIN
  }) as Array<LoadInstruction | LoadByOriginInstruction>
})
</script>