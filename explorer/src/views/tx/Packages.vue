<template>
  <div v-if="txd">
    <ul class="space-y-2" v-if="txd.packages.length">
      <li v-for="pkg of txd.packages">
        <PackageListItem :item="pkg" />
      </li>
    </ul>

    <EmptyContent text="This transaction deploys no packages." v-else />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { KEYS } from '../../constants'
import PackageListItem from '../../components/lists/PackageListItem.vue'
import EmptyContent from '../../components/EmptyContent.vue'

const txd = inject(KEYS.txd)
</script>