<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <div class="flex items-center gap-4">
      <Enclosed :icon="CaFingerprintRecognition">
        <Copyable :value="signature" size="sm" short />
      </Enclosed>
      <Enclosed :icon="CaPassword">
        <Copyable
          :to="{ name: 'addr', params: { addr: address } }"
          :value="address"
          size="sm"
          short />
      </Enclosed>
    </div>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PubKey, base16, instructions } from '@aldea/sdk'
import { CaFingerprintRecognition, CaPassword } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import Copyable from '../Copyable.vue'
import Enclosed from '../Enclosed.vue'

const props = defineProps<{
  idx: number;
  instruction: instructions.SignInstruction | instructions.SignToInstruction;
}>()

const address = computed(() => {
  return PubKey.fromBytes(props.instruction.pubkey).toAddress().toString()
})

const signature = computed(() => {
  return base16.encode(props.instruction.sig)
})
</script>