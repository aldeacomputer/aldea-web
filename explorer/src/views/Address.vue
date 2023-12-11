<template>
  <article>
    <PageHeader
      class="mb-10"
      title="Address"
      id="addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t">
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <!-- // comment out as with paginated lists we can\t safely compute the balance
          <Label :icon="XacIcon" border="success">
            <div class="font-mono text-14">{{ balance }}</div>
          </Label>
          -->
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
//import { computed, provide, ref, toRaw, unref, watch } from 'vue'
//import { provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
//import { Address, BCS, abi, base16 } from '@aldea/sdk'
import { Address } from '@aldea/sdk'
import { CaShoppingBag, CaArrowsVertical } from '@kalimahapps/vue-icons'
//import { KEYS, COIN_PKG_ID, COIN_CLASS } from '../constants'
//import { KEYS } from '../constants'
//import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'
//import Label from '../components/Label.vue'
//import XacIcon from '../components/XacIcon.vue'

//const store = useAppStore()
const route = useRoute()

useHead({
  title: () => `Address ${route.params.addr}`
})

try {
  Address.fromString(route.params.addr as string)
} catch (e) {
  throw new Error('invalid address')
}

//const coinAbi = ref<abi.Abi>(await store.adapter.getAbi(COIN_PKG_ID))
//const jigs = ref<DataOf<JigData>>(await loadJigs(route.params.addr as string))
//
//provide(KEYS.jigs, jigs)

//const balance = computed(() => {
//  const coins = jigs.value.data.filter(o => o.class === COIN_CLASS)
//  const motos = coins.reduce((sum, o) => {
//    if (coinAbi.value) {
//      const abi = toRaw(unref(coinAbi))!
//      const bcs = new BCS(abi)
//      const [motos] = bcs.decode('Coin', base16.decode(o.state))
//      sum += motos
//    }
//    return sum
//  }, 0n)
//
//  return (Number(motos) / 100000000).toFixed(8)
//})

//async function loadJigs(addr: string): Promise<DataOf<JigData>> {
//  return store.adapter.getAddrJigs(addr)
//}
//
//watch(() => route.params.id, async addr => {
//  if (typeof route.name === 'string' && /^addr/.test(route.name)) {
//    jigs.value = await loadJigs(addr as string)
//    window.scrollTo({ top: 0 })
//  }
//})
</script>