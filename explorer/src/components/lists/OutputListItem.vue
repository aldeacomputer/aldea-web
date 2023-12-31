<template>
  <BaseListItem :icon="CaSettings">
    <div class="flex items-center gap-6">
      <Copyable
        :to="{ name: 'jig', params: { id: item.id }}"
        short
        size="sm"
        :value="item.id" />

      <div class="font-mono text-14 text-secondary">{{ className }}</div>

      <div class="hidden sm:block" v-if="balance">
        <Enclosed :icon="XacIcon">
          <span class="font-mono text-14 text-secondary">{{ balance }}</span>
        </Enclosed>
      </div>
    </div>

    <template #drop-down>
      <LockLabel :lock="item.lock" />
      <div class="mt-4 space-y-2">
        <GraphLink :to="{ name: 'jig', params: { id: item.id } }" label="ID" size="sm" :value="item.id" responsive />
        <GraphLink :to="{ name: 'jig', params: { id: item.id } }" label="Origin" size="sm" :value="item.origin" responsive />
        <GraphLink :to="{ name: 'jig', params: { id: item.id } }" label="Location" size="sm" :value="item.location" responsive />
        <GraphLink :to="{ name: 'pkg', params: { id: item.class.replace(/_\d+$/, '') } }" label="Class" size="sm" :value="item.class" responsive />
      </div>
    </template>
  </BaseListItem>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, toRaw, unref } from 'vue'
import { Output, OutputResponse } from '@aldea/sdk'
import { CaSettings } from '@kalimahapps/vue-icons'
import { useAppStore } from '../../stores/app'
import { COIN_CLASS } from '../../constants'
import BaseListItem from './BaseListItem.vue'
import GraphLink from '../GraphLink.vue'
import Copyable from '../Copyable.vue'
import Enclosed from '../Enclosed.vue'
import LockLabel from '../LockLabel.vue'
import XacIcon from '../XacIcon.vue'

const store = useAppStore()

const props = defineProps<{
  item: OutputResponse
}>()

const output = ref<Output>()

const className = computed(() => {
  const o = toRaw(unref(output))
  return o?.className
})

const balance = computed(() => {
  if (props.item.class === COIN_CLASS) {
    return (Number(jigProps.value?.amount) / 100000000).toFixed(8)
  }
})

const jigProps = computed(() => {
  const o = toRaw(unref(output))
  return o?.props as Record<string, any>
})

onBeforeMount(async () => {
  const abi = await store.adapter.getAbi(props.item.class.replace(/_\d+$/, ''))
  output.value = Output.fromJson(props.item, abi)
})
</script>