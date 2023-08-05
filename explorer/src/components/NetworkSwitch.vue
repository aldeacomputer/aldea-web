<template>
  <div class="relative inline-block" ref="button">
    <div
      class="inline-flex items-center w-32 px-2 py-0.5 gap-2 text-14 text-secondary hover:text-primary rounded-sm transition-colors cursor-pointer"
      :class="{
        'bg-layer-01 hover:bg-layer-02': onHome && !active,
        'bg-layer-02 hover:bg-layer-03': !onHome && !active,
        'bg-layer-02': onHome && active,
        'bg-layer-03': !onHome && active,
      }"
      @click="active = !active">
      <span class="w-2 h-2 bg-green-40 rounded-full" />
      <span class="flex-auto">{{ selected.label }}</span>
      <CaCaretDown />
    </div>
    <div
      class="absolute top-full left-0 right-0 mt-0.5 rounded-sm overflow-hidden"
      :class="{
        'bg-layer-01': onHome,
        'bg-layer-02': !onHome,
      }"
      v-show="active">
      <ul class="text-14 text-secondary">
        <li
          v-for="net of store.networks"
          class="flex items-center px-2 py-0.5 gap-2 bg-transparent cursor-pointer"
          :class="{
            'hover:bg-layer-02': onHome,
            'hover:bg-layer-03': !onHome,
            'text-secondary': isSelected(net.id),
            'text-helper hover:text-gray-30': !isSelected(net.id),
          }"
          @click="select(net.id)">
          <span
            class="w-2 h-2  rounded-full"
            :class="isSelected(net.id) ? 'bg-green-40' : 'bg-gray-60'" />
          <span class="flex-auto">{{ net.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { CaCaretDown } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import { computed } from 'vue';

const store = useAppStore()

defineProps<{
  onHome?: boolean;
}>()

const active = ref(false)
const button = ref<HTMLElement>()

const selected = computed(() => {
  return store.networks.find(n => n.id === store.network)!
})

function select(id: string) {
  store.$patch({ network: id })
  active.value = false
}

function isSelected(id: string): boolean {
  return id === selected.value.id
}

function clickAway(e: Event) {
  const el = e.target as HTMLElement
  if (
    active.value &&
    !(button.value === el || button.value?.contains(el))
  ) {
    active.value = false
  }
}

onMounted(() => document.body.addEventListener('click', clickAway))
onUnmounted(() => document.body.removeEventListener('click', clickAway))
</script>