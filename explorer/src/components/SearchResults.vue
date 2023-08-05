<template>
  <div
    class="overflow-y-scroll"
    style="min-height: 280px; max-height: 460px;">
    <div class="flex items-center justify-between gap-4 p-4">
      <span class="text-14 text-helper" v-if="hasResults">Recent searches:</span>
      <span
        class="flex items-center gap-2 text-helper hover:text-secondary transition-colors cursor-pointer"
        v-if="hasResults"
        @click="search.clear">
        <span class="text-14">Clear history</span>
        <CaTrashCan />
      </span>
      <span class="text-14 text-helper" v-if="!hasResults">No recent searches.</span>
    </div>
    <ul>
      <li
        v-for="result, i in search.recentResults"
        class="px-4 py-2 cursor-pointer transition-colors"
        :class="{'bg-layer-02': i === idx}"
        @mouseenter="idx = i"
        @click="search.goto(result)">
        <div class="font-mono text-14 text-secondary">{{ result.value }}</div>
        <div class="text-12 text-helper">{{ resultType(result) }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CaTrashCan } from '@kalimahapps/vue-icons'
import { useSearchStore } from '../stores/search'

const search = useSearchStore()

const emit = defineEmits<{
  blur: []
}>()

const idx = ref(-1)

const hasResults = computed(() => !!search.recentResults.length)

function resultType(result: SearchResult) {
  switch(result.type) {
    case 'addr': return 'Address'
    case 'jig': return 'Jig'
    case 'pkg': return 'Package'
    case 'tx': return 'Transaction'
  }
}

function up() {
  idx.value = idx.value - 1
  if (idx.value < 0) {
    idx.value = -1
    emit('blur')
  }
}

function down() {
  idx.value = idx.value + 1
  if (idx.value > search.recentResults.length - 1) { idx.value = 0 }
}

function select() {
  if (idx.value > -1) { search.goto(search.recentResults[idx.value]) }
}

defineExpose({ up, down, select })
</script>
