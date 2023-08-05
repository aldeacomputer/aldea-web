<template>
  <article v-if="tx">
    <PageHeader
      title="Transaction"
      :id="tx.id"
      class="mb-10">
      <template #title-labels>
        <Label type="warning" :icon="CaInformation" size="sm">Pending</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <Label :icon="CaCalendar">
            <time class="font-mono text-14">{{ timestamp }}</time>
          </Label>
          <Label :icon="CaMoney">
            <div class="font-mono space-x-1.5">
              <span class="text-14">100</span>
              <span class="text-12">motos</span>
            </div>
          </Label>
        </div>
      </template>
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'tx_instructions' }" :icon="CaListDropdown">Instructions</TabLink>
      <TabLink :to="{ name: 'tx_outputs' }" :icon="CaArrowsHorizontal">Inputs/Outputs</TabLink>
      <TabLink :to="{ name: 'tx_packages' }" :icon="CaBox">Packages</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import * as dayjs from 'dayjs'
import { Tx } from '@aldea/sdk'
import { CaArrowsHorizontal, CaBox, CaCalendar, CaInformation, CaListDropdown, CaMoney } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import * as keys from '../injection-keys'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

const txd = ref<TxData>(await loadTx(route.params.id as string))
const tx = computed(() => Tx.fromHex(txd.value.rawtx!))
provide(keys.txd, txd)
provide(keys.tx, tx)

const timestamp = computed(() => {
  return dayjs
    .unix(txd.value.timestamp)
    .format('YYYY-MM-DD HH:mm')
})

async function loadTx(id: string): Promise<TxData> {
  return store.adapter.getTx(id)
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name && /^tx/.test(to.name as string) && to.params.id !== from.params.id) {
    txd.value = await loadTx(to.params.id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>