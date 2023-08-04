<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 px-4 py-6 flex flex-col items-center justify-center bg-black/70"
    @click.self="hideSearch">

    <div class="w-full max-w-3xl bg-layer-01 rounded-sm overflow-hidden">
      <SearchField ref="field" />
      <SearchResults ref="results" @blur="field?.focus()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useSearchStore } from '../stores/search'
import SearchField from './SearchField.vue'
import SearchResults from './SearchResults.vue'

const search = useSearchStore()

const field = ref<InstanceType<typeof SearchField>>()
const results = ref<InstanceType<typeof SearchResults>>()

function isFieldInFocus() {
  return field.value?.input?.matches(':focus')
}

function hideSearch() {
  search.$patch({ show: false })
}

function onKeyDown(e: KeyboardEvent) {
  switch(e.key) {
    case 'ArrowDown':
      if (isFieldInFocus()) { field.value?.blur() }
      e.preventDefault()
      results.value?.down()
      break
    case 'ArrowUp':
      if (!isFieldInFocus()) {
        e.preventDefault()
        results.value?.up()
      }
      break
    case 'Enter':
      if (!isFieldInFocus()) {
        e.preventDefault()
        results.value?.select()
      }
      break
    case 'Escape':
      e.preventDefault()
      search.$patch({ show: false })
  }
}

onMounted(() => {
  field.value?.focus()
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>
