<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <div class="flex items-center gap-4">
      <ShortLabel :icon="CaFingerprintRecognition" :value="signature" />
      <ShortLink type="addr" :value="address" />
    </div>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SignInstruction, SignToInstruction } from '@aldea/core/instructions'
import { PubKey, base16 } from '@aldea/sdk'
import { CaFingerprintRecognition } from '@kalimahapps/vue-icons'
import BaseInstruction from './BaseInstruction.vue'
import ShortLabel from '../ShortLabel.vue'
import ShortLink from '../ShortLink.vue'

const props = defineProps<{
  idx: number;
  instruction: SignInstruction | SignToInstruction;
}>()

const address = computed(() => {
  return PubKey.fromBytes(props.instruction.pubkey).toAddress().toString()
})

const signature = computed(() => {
  return base16.encode(props.instruction.sig)
})
</script>