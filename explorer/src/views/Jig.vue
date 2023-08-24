<template>
  <article v-if="jig">
    <PageHeader
      title="Jig"
      :id="jig.id"
      class="mb-10">
      <template #title-labels>
        <Label class="font-mono" size="sm">{{ $helpers.jigClassName(jig) }}</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <LockLabel :lock="jig.lock" />
        </div>
        <div class="pt-6 space-y-2 md:space-y-0.5">
          <GraphLink :to="{ name: 'jig', params: { id: jig.id } }" label="Origin" :value="jig.origin" />
          <GraphLink :to="{ name: 'jig', params: { id: jig.id } }" label="Location" :value="jig.location" />
          <GraphLink :to="{ name: 'pkg', params: { id: jig.class.replace(/_\d+$/, '') } }" label="Class" :value="jig.class" />
        </div>
      </template>
      <!--
      <template #right-column>
        <figure class="mb-4 p-4 border border-gray-70">
          <img src="/tmp/jigpic.jpg" class="block" />
        </figure>
        <table class="w-full text-14">
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left align-top">Name</th>
            <td class="pb-1 align-top">The Leader</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left align-top">Decscription</th>
            <td class="pb-1 align-top">The leader of the Movementarians</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left align-top">Creator</th>
            <td class="pb-1 align-top">Aldea Computer</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-secondary text-left align-top">Link</th>
            <td class="pb-1 align-top"><a class="link underline">https://aldea.computer</a></td>
          </tr>
        </table>
      </template>
      -->
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'jig_state' }" :icon="CaExpandAll">State</TabLink>
      <TabLink :to="{ name: 'jig_history' }" :icon="CaChangeCatalog">History</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { CaExpandAll, CaChangeCatalog } from '@kalimahapps/vue-icons'
import { KEYS } from '../constants'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import GraphLink from '../components/GraphLink.vue'
import Label from '../components/Label.vue'
import LockLabel from '../components/LockLabel.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const route = useRoute()
const store = useAppStore()

useHead({
  title() {
      return `Jig ${route.params.id}`
  },
})

const jig = ref<JigData>(await loadJig(route.params.id as string))
provide(KEYS.jig, jig)

async function loadJig(id: string): Promise<JigData> {
  return store.adapter.getJig(id)
}

watch(() => route.params.id, async id => {
  if (typeof route.name === 'string' && /^jig/.test(route.name)) {
    jig.value = await loadJig(id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>