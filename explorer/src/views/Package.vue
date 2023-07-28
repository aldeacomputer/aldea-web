<template>
  <article v-if="pkg">
    <PageHeader
      class="mb-10"
      title="Package"
      :id="pkg.id"
      :links="graphLinks">
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'pkg_docs' }" :icon="CaDocumentMultiple01">Docs</TabLink>
      <TabLink :to="{ name: 'pkg_src' }" :icon="CaRepoSourceCode">Source</TabLink>
      <TabLink :to="{ name: 'pkg_abi' }" :icon="CaCode">ABI</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Abi } from '@aldea/core/abi'
import { PackageResponse } from '@aldea/sdk'
import { CaCode, CaDocumentMultiple01, CaRepoSourceCode } from '@kalimahapps/vue-icons'
import * as keys from '../injection-keys'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

const abi = ref<Abi>()
const pkg = ref<PackageResponse>()

provide(keys.abi, abi)
provide(keys.pkg, pkg)

const graphLinks = computed(() => {
  return [
    { title: 'Tx ID', value: 'd14fd0ac9e06d4803d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4', url: '/tx/1' },
    { title: 'Publisher', value: 'addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t', url: '/addr/1' },
  ]
})

onBeforeMount(async () => {
  abi.value = await store.adapter.getPkgAbi(route.params.id as string)
  pkg.value = await store.adapter.getPkgSrc(route.params.id as string)
})
</script>