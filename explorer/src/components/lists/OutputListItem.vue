<template>
  <BaseListItem :icon="CaSettings">
    <Copyable
      :to="{ name: 'jig', params: { id: item.id }}"
      responsive
      size="sm"
      :value="item.id" />
  </BaseListItem>
</template>

<script setup lang="ts">
import { CaSettings } from '@kalimahapps/vue-icons'
import { OutputResponse } from '@aldea/sdk'
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: OutputResponse
}>()
</script>