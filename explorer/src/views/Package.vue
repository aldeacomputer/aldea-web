<template>
  <article v-if="pkg">
    <PageHeader
      class="mb-10"
      title="Package"
      :id="pkg.id">
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'pkg_docs' }" :icon="CaDocumentMultiple01">Docs</TabLink>
      <TabLink :to="{ name: 'pkg_src' }" :icon="CaRepoSourceCode">Source</TabLink>
      <TabLink :to="{ name: 'pkg_abi' }" :icon="CaCode">ABI</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { CaCode, CaDocumentMultiple01, CaRepoSourceCode } from '@kalimahapps/vue-icons'
import * as keys from '../injection-keys'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

const pkg = ref<PkgData>(await loadPkg(route.params.id as string))
provide(keys.pkg, pkg)

//const graphLinks = computed(() => {
//  // TODO - can we show the TX id from a package?
//  return [
//    { title: 'Tx ID', value: 'd14fd0ac9e06d4803d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4', url: '/tx/1' },
//    { title: 'Publisher', value: 'addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t', url: '/addr/1' },
//  ]
//})

async function loadPkg(id: string): Promise<PkgData> {
  return store.adapter.getPkg(id)
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name && /^pkg/.test(to.name as string) && to.params.id !== from.params.id) {
    pkg.value = await loadPkg(to.params.id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>