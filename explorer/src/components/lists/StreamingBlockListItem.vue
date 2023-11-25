<template>
  <BaseListItem :icon="BxCube">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <Copyable
        :to="{ name: 'block', params: { id: item.id } }"
        short
        size="sm"
        :value="item.id" />
      <div class="flex items-center gap-1">
        <span class="text-secondary">#</span>
        <span>{{ item.height }}</span>
      </div>
    </div>
  </BaseListItem>
</template>

<script setup lang="ts">
import { BxCube } from "@kalimahapps/vue-icons"
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: BlockData;
}>()
</script>
