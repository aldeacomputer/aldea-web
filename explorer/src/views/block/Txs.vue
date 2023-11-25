<template>
  <div v-if="txds?.data.length">
    <ul class="space-y-2">
      <li v-for="tx of txds.data">
        <TxListItem :item="tx" />
      </li>
    </ul>

    <CursorPagination
      class="mt-8"
      :meta="txds.meta"
      @prev="router.push({ query: { before: $event } })"
      @next="router.push({ query: { after: $event } })"
      v-if="txds.meta" />

    <CursorPagination class="mt-8" :meta="txds.meta" v-if="txds.meta" />
  </div>

  <p class="p-4 text-helper text-center" v-else>
    This block has no transactions.
  </p>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { KEYS } from '../../constants'
import TxListItem from '../../components/lists/TxListItem.vue'
import CursorPagination from '../../components/CursorPagination.vue'

const router = useRouter()
const txds = inject(KEYS.txds)
</script>