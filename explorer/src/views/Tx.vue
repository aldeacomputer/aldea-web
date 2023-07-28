<template>
  <article v-if="extTx">
    <PageHeader
      title="Transaction"
      :id="extTx.id"
      class="mb-10"
      :links="graphLinks">
      <template #title-labels>
        <Label type="warning" :icon="CaInformation">Pending</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex items-center justify-between p-2 gap-3 bg-neutral-800">
            <CaCalendar class="text-white" />
            <time class="font-mono text-14">2023-02-20 15:12</time>
          </div>
          <div class="flex items-center justify-between p-2 gap-2 bg-neutral-800">
            <CaMoney class="text-white" />
            <div class="font-mono space-x-1.5">
              <span class="text-14">100</span>
              <span class="text-12">motos</span>
            </div>
          </div>
        </div>
      </template>
      <template #right-column>
        <Button :icon="CaAdd" class="mt-2">Broadcast Transaction</Button>
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
import { computed, onBeforeMount, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CommitTxResponse, Tx } from '@aldea/sdk'
import { CaAdd, CaArrowsHorizontal, CaBox, CaCalendar, CaInformation, CaListDropdown, CaMoney } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import * as keys from '../injection-keys'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import Button from '../components/Button.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

const extTx = ref<CommitTxResponse>()
const tx = computed(() => Tx.fromHex(extTx.value?.rawtx!))

provide(keys.extendedTx, extTx)
provide(keys.tx, tx)

const graphLinks = computed(() => {
  return [
    { title: 'Block ID', value: 'd14fd0ac9e06d4803d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4', url: '/block/1' },
    { title: 'Address', value: 'addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t', url: '/addr/1' },
  ]
})

onBeforeMount(async () => {
  extTx.value = await store.adapter.getTx(route.params.id as string)
})
</script>