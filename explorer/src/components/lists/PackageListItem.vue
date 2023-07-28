<template>
  <BaseListItem :icon="CaBox">
    <Copyable
      :to="{ name: 'pkg', params: { id: item.id }}"
      responsive
      size="sm"
      :value="item.id" />
  </BaseListItem>
</template>

<script setup lang="ts">
import { CaBox } from '@kalimahapps/vue-icons'
import { PackageResponse } from '@aldea/sdk'
import BaseListItem from './BaseListItem.vue'
import Copyable from '../Copyable.vue'

defineProps<{
  item: PackageResponse
}>()
</script>