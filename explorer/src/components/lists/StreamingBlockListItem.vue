<template>
  <BaseListItem :icon="CaSettings">
    <div class="flex items-center justify-between gap-6">
      <Copyable
        short
        size="sm"
        :value="item.id" />
      <div>{{ item.height }}</div>
    </div>
  </BaseListItem>
</template>

<script setup lang="ts">
import { CaSettings } from '@kalimahapps/vue-icons'
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: any;
}>()

</script>