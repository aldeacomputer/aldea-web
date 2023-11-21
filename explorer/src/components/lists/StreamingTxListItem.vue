<template>
  <BaseListItem :icon="AkArrowUpDown">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <Copyable
        short
        size="sm"
        :value="item.id" />
        <div>
          <p>80675</p>
        </div>
      <div class="hidden xs:block">{{ item.size }}</div>
      
    </div>
  </BaseListItem>
</template>

<script setup lang="ts">
import { AkArrowUpDown } from "@kalimahapps/vue-icons";
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: any;
}>()

</script>