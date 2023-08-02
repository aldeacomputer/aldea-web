<template>
  <article v-if="extTx">
    <PageHeader
      title="Transaction"
      :id="extTx.id"
      class="mb-10">
      <template #title-labels>
        <Label type="warning" :icon="CaInformation" size="sm">Pending</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <Label :icon="CaCalendar">
            <time class="font-mono text-14">{{ txDate }}</time>
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
import { computed, onBeforeMount, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CommitTxResponse, Tx } from '@aldea/sdk'
import * as dayjs from 'dayjs'
import { CaArrowsHorizontal, CaBox, CaCalendar, CaInformation, CaListDropdown, CaMoney } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import * as keys from '../injection-keys'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

interface ExtendedTx extends CommitTxResponse {
  executed_at: number;
}

const extTx = ref<ExtendedTx>()
const tx = computed(() => Tx.fromHex(extTx.value?.rawtx!))

provide(keys.extendedTx, extTx)
provide(keys.tx, tx)

const txDate = computed(() => {
  return dayjs
    .unix(extTx?.value!.executed_at)
    .format('YYYY-MM-DD HH:mm')
})

onBeforeMount(async () => {
  extTx.value = await store.adapter.getTx(route.params.id as string) as ExtendedTx
})
</script>