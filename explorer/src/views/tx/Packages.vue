<template>
  <div v-if="txd">
    <ul class="space-y-2" v-if="txd.packages.length">
      <li v-for="pkg of txd.packages">
        <PackageListItem :item="pkg" />
      </li>
    </ul>

    <p class="p-4 text-helper text-center" v-else>
      This transaction deploys no packages.
    </p>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { KEYS } from '../../constants'
import PackageListItem from '../../components/lists/PackageListItem.vue'

const txd = inject(KEYS.txd)
</script>