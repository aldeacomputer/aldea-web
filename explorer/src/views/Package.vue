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
import { provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { CaCode, CaDocumentMultiple01, CaRepoSourceCode } from '@kalimahapps/vue-icons'
import { KEYS } from '../constants'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

useHead({
  title() {
      return `Package ${route.params.id}`
  },
})

const pkg = ref<PkgData>(await loadPkg(route.params.id as string))
provide(KEYS.pkg, pkg)

async function loadPkg(id: string): Promise<PkgData> {
  return store.adapter.getPkg(id)
}

watch(() => route.params.id, async id => {
  if (typeof route.name === 'string' && /^pkg/.test(route.name)) {
    pkg.value = await loadPkg(id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>