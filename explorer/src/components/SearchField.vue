<template>
  <div class="flex items-center border-b border-gray-70">
    <div class="flex items-center justify-center w-12 h-12">
      <component
        :is="search.isError ? CaWarning : CaSearch"
        :class="{
          'text-secondary group-hover:text-primary transition-colors': !search.isError,
          'text-error': search.isError,
        }" />
    </div>
    <div class="flex-auto">
      <input
        class="w-full h-12 font-mono text-14 bg-transparent placeholder:text-placeholder outline-none"
        :class="search.isError ? 'text-error' : 'text-secondary focus:text-primary'"
        type="text"
        placeholder="Jig / Transaction / Package / Address"
        autocomplete="off"
        ref="input"
        data-1p-ignore
        v-model="search.term"
        @keyup.prevent.enter="search.lookup" />
    </div>
    <div
      class="flex items-center justify-center w-12 h-12"
      v-show="!search.isBlank">
      <div
        class="p-1 text-secondary hover:text-primary transition-colors cursor-pointer"
        @click="search.$patch({ term: '', errorTerm: '' })">
        <CaClose />
      </div>
    </div>
    <div
      class="flex items-center justify-center w-12 h-12 text-primary "
      v-show="search.isLoading">
      <LoadingIcon class=" animate-spin" />
    </div>
    <div
      class="flex items-center justify-center w-12 h-12 text-primary bg-blue-60 hover:bg-blue-50 transition-colors"
      v-show="search.isValid && !search.isError && !search.isLoading"
      @click="search.lookup">
      <CaArrowRight />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CaArrowRight, CaClose, CaSearch, CaWarning } from '@kalimahapps/vue-icons'
import { useSearchStore } from '../stores/search'
import LoadingIcon from './LoadingIcon.vue'

const search = useSearchStore()

const input = ref<HTMLInputElement>()

function focus() {
  input.value?.focus()
}

function blur() {
  input.value?.blur()
}

defineExpose({ input, focus, blur })
</script>