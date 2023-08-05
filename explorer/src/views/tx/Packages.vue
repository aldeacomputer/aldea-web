<template>
  <div v-if="txd">
    <ul class="space-y-2">
      <li v-for="pkg of txd.packages">
        <PackageListItem :item="pkg" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import * as keys from '../../injection-keys'
import PackageListItem from '../../components/lists/PackageListItem.vue'

const txd = inject(keys.txd)
</script>