<template>
  <article>
    <PageHeader
      class="mb-10"
      title="Address"
      id="addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t">
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex items-center justify-between p-2 gap-2 bg-neutral-800">
            <span class="text-white">₳</span>
            <div class="font-mono text-14">{{ balance }}</div>
          </div>
        </div>
      </template>
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'addr_jigs' }" :icon="CaShoppingBag">Owned</TabLink>
      <TabLink :to="{ name: 'addr_txns' }" :icon="CaArrowsVertical">Transactions</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, ref, toRaw, unref } from 'vue'
import { useRoute } from 'vue-router'
import { CaShoppingBag, CaArrowsVertical } from '@kalimahapps/vue-icons'
import * as keys from '../injection-keys'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'
import { Abi } from '@aldea/core/abi'
import { BCS, OutputResponse, base16 } from '@aldea/sdk'

const COIN_PKG_ID = '0000000000000000000000000000000000000000000000000000000000000000'

const store = useAppStore()
const route = useRoute()

const coinAbi = ref<Abi>()
const jigs = ref<OutputResponse[]>([])

provide(keys.addrJigs, jigs)

const balance = computed(() => {
  const coins = jigs.value.filter(o => o.class === `${COIN_PKG_ID}_0`)
  const motos = coins.reduce((sum, o) => {
    if (coinAbi.value) {
      const bcs = new BCS(toRaw(unref(coinAbi))!)
      const [motos] = bcs.decode('Coin', base16.decode(o.state))
      sum += motos
    }
    return sum
  }, 0n)

  return (Number(motos) / 100000000).toFixed(8)
})

onBeforeMount(async () => {
  coinAbi.value = await store.adapter.getPkgAbi(COIN_PKG_ID)
  jigs.value = await store.adapter.getAddrJigs(route.params.addr as string)
})
</script>