<template>
  <BaseListItem :icon="AkArrowUpDown">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <div class="flex-auto">
        <Copyable
          :to="{ name: 'tx', params: { id: item.id } }"
          responsive
          size="sm"
          :value="item.id" />
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