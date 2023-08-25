<template>
  <div
    class="flex items-center border-b"
    :class="search.isError ? 'border-error' : 'border-gray-70'">
    <div class="flex items-center justify-center w-12 h-12">
      <CaSearch class="text-secondary group-hover:text-primary transition-colors" />
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
      class="flex items-center justify-center w-12 h-12 text-primary"
      v-show="search.isLoading">
      <LoadingIcon class="animate-spin" />
    </div>
    
    <ToolTip :content="search.errorTerm" show v-if="search.isError">
      <div class="flex items-center justify-center w-12 h-12 text-error bg-disabled">
        <CaWarning />
      </div>
      <template #content>
        <div class="flex items-center gap-2 text-error" v-if="search.isError">
          <CaWarning />
          <span>Not found.</span>
        </div>
      </template>
    </ToolTip>
    <ToolTip
      content="Enter a 64 character ID, Pointer, or an Address."
      :hover="!(search.isBlank || search.isValid)"
      v-else>
      <div
        class="flex items-center justify-center w-12 h-12 "
        :class="{
          'text-error bg-disabled': search.isError,
          'text-primary bg-blue-60 hover:bg-blue-50 transition-colors cursor-pointer': !search.isError && (search.isBlank || search.isValid),
          'text-secondary bg-disabled': !search.isError && !(search.isBlank || search.isValid),
        }"
        @click="search.lookup">
        <component :is="search.isError ? CaWarning : CaArrowRight" />
      </div>
    </ToolTip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CaArrowRight, CaClose, CaSearch, CaWarning } from '@kalimahapps/vue-icons'
import { useSearchStore } from '../stores/search'
import LoadingIcon from './LoadingIcon.vue'
import ToolTip from './ToolTip.vue'

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