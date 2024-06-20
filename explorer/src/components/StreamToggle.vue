<template>
  <div class="flex mb-2">
    <span class="pr-2 text-14 text-secondary">Stream:</span>
    <label class="relative inline-block w-10 h-6">
      <input
        type="checkbox"
        class="opacity-0 group"
        :checked="modelValue"
        @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).checked)" />
        <span
          class="slider rounded-full absolute cursor-pointer round top-0 bottom-0 left-0 -right-1 bg-gray-80 outline outline-1 outline-gray-60 transition ease-in-out delay-250
            before:absolute
            before:w-4 
            before:h-4
            before:left-1
            before:bottom-1
            before:rounded-full     
            before:bg-gray-50
            before:transition
            before:ease-in-out
            before:delay-250
            before:content-['']
            " />
    </label>
  </div>
    
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useAppStore } from '../stores/app'
//import { Backend } from '../stores/blockchain/backend'

const store = useAppStore()

const props = defineProps<{
  modelValue: boolean;
}>()

defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>()

watch(() => props.modelValue, _isStreaming => {
  if (store.network === 'devnet') {
    //const adapter = store.adapter as ChainAdapter
    //isStreaming ? adapter.startStream() : adapter.stopStream()
  }
})
</script>

<style scoped>
input:checked + .slider {
  @apply outline outline-1 outline-green-40 bg-gray-70;
}

input:checked + .slider:before {
  @apply bg-green-40 translate-x-5;
}
</style>../stores/blockchain/backend.ts.bak