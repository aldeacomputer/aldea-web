<template>
  <BaseListItem :icon="BxCube">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <div>#{{ item.height }}</div>
      <div class="flex items-center gap-1">
        <p>3216</p>
        <p class="text-14 text-secondary">txs</p>
      </div>
      <div class="flex gap-1">
        <p class="text-14 hidden xs:block">Producer:</p>
        <a href="#" class="text-14 text-blue-40 hover:text-blue-30">@producer</a>
      </div>
    </div>
  </BaseListItem>
</template>

<script setup lang="ts">
import { BxCube } from "@kalimahapps/vue-icons";
import BaseListItem from './BaseListItem.vue'

defineProps<{
  item: any;
}>()

</script>

