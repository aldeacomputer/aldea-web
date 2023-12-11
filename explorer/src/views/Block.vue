<template>
  <article v-if="block">
    <PageHeader
      title="Block"
      :id="block.id"
      class="mb-10">
      <template #title-labels>
        <Label class="font-mono" size="sm">
          <span class="text-placeholder">#</span>
          {{ block.height }}
        </Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <Label :icon="CaCalendar">
            <time class="font-mono text-14">{{ timestamp }}</time>
          </Label>
        </div>
        <div class="pt-6 space-y-2 md:space-y-0.5">
          <GraphLink :to="{ name: 'block', params: { id: block.prev_block_id } }" label="Previous" :value="block.prev_block_id" />
          <GraphLink label="Creator" :value="block.creator" />
          <GraphLink label="Signature" :value="block.sig" />
        </div>
      </template>
      <template #right-column>
        <table class="w-full text-14">
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left">Transactions</th>
            <td class="pb-1">{{ txds.meta?.total_count }}</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left">TX root</th>
            <td class="pb-1"><Copyable size="sm" short :value="block.tx_root" /></td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left">State root</th>
            <td class="pb-1"><Copyable size="sm" short :value="block.state_root" /></td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left">State commit</th>
            <td class="pb-1"><Copyable size="sm" short :value="block.state_commit" /></td>
          </tr>
        </table>
      </template>
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'block_transactions' }" :icon="CaListDropdown">Transactions</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { useAppStore } from '../stores/app'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import * as dayjs from 'dayjs'
import { CaCalendar, CaListDropdown } from '@kalimahapps/vue-icons'
import { KEYS } from '../constants'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import GraphLink from '../components/GraphLink.vue'
import Copyable from '../components/Copyable.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

useHead({
  title: () => `Block ${route.params.id}`
})

const block = ref<BlockData>(await loadBlock(route.params.id as string))
const txds = ref<DataOf<TxDataMin>>(await loadTxs(route.params.id as string))

provide(KEYS.txds, txds)

const timestamp = computed(() => {
  return dayjs(block.value.created_at)
    .format('YYYY-MM-DD HH:mm')
})

async function loadBlock(id: string): Promise<BlockData> {
  return store.adapter.getBlock(id)
}

async function loadTxs(id: string): Promise<DataOf<TxDataMin>> {
  return store.adapter.getBlockTxs(id)
}

watch(() => route.params.id, async id => {
  if (typeof route.name === 'string' && /^block/.test(route.name)) {
    block.value = await loadBlock(id as string)
    txds.value = await loadTxs(id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>