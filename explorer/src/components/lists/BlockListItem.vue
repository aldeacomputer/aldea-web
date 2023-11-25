<template>
  <BaseListItem :icon="BxCube">
    <div class="flex items-center justify-between gap-6 last:pr-4">
      <div class="flex-auto">
        <Copyable
          :to="{ name: 'block', params: { id: item.id } }"
          responsive
          size="sm"
          :value="item.id" />
      </div>
      
      <div class="flex items-center gap-1 text-14">
        <span class="text-placeholder">#</span>
        <span>{{ item.height }}</span>
      </div>

      <div class="inline-flex items-center px-3 gap-2 text-secondary">
        <CaCalendar class="shrink-0" />
        <time class="font-mono text-14">{{ timestamp }}</time>
      </div>
    </div>

    <template #drop-down>
      <div class="space-y-2">
        <GraphLink label="TX root" size="sm" responsive :value="item.tx_root" />
        <GraphLink label="State root" size="sm" responsive :value="item.state_root" />
        <GraphLink label="State commit" size="sm" responsive :value="item.state_commit" />
        <GraphLink label="Creator" size="sm" responsive :value="item.creator" />
        <GraphLink label="Signature" size="sm" responsive :value="item.sig" />
      </div>
    </template>
  </BaseListItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as dayjs from 'dayjs'
import { CaCalendar, BxCube } from "@kalimahapps/vue-icons"
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'
import GraphLink from '../GraphLink.vue'

const props = defineProps<{
  item: BlockData;
}>()

const timestamp = computed(() => {
  return dayjs(props.item.created_at)
    .format('YYYY-MM-DD HH:mm')
})
</script>
