<template>
  <BaseListItem :icon="AkArrowUpDown">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <Copyable
        :to="{ name: 'tx', params: { id: item.id } }"
        short
        size="sm"
        :value="item.id" />
      <div class="flex items-center gap-1">
        <span>{{ (item.size / 1000).toFixed(2) }}</span>
        <span class="text-secondary">kb</span>
      </div>
    </div>
  </BaseListItem>
</template>

<script setup lang="ts">
import { AkArrowUpDown } from "@kalimahapps/vue-icons";
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: TxDataMin;
}>()
</script>