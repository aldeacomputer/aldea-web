<template>
  <article v-if="jig">
    <PageHeader
      title="Jig"
      :id="jig.id"
      class="mb-10"
      :links="graphLinks">
      <template #title-labels>
        <Label class="font-mono" size="sm">{{ $helpers.jigClassName(jig) }}</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <LockLabel :lock="jig.lock" />
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
import { computed, provide, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { CaExpandAll, CaChangeCatalog } from '@kalimahapps/vue-icons'
import * as keys from '../injection-keys'
import { useAppStore } from '../stores/app'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import LockLabel from '../components/LockLabel.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const route = useRoute()
const store = useAppStore()

const jig = ref<JigData>(await loadJig(route.params.id as string))
provide(keys.jig, jig)

const graphLinks = computed(() => {
  return [
    { title: 'Origin', value: jig.value.origin, url: `/jig/${jig.value.id}` },
    { title: 'Location', value: jig.value.location, url: `/jig/${jig.value.id}` },
    { title: 'Class', value: jig.value.class, url: `/pkg/${jig.value.class.replace(/_\d+/, '')}` },
  ]
})

async function loadJig(id: string): Promise<JigData> {
  return store.adapter.getJig(id)
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.name && /^jig/.test(to.name as string) && to.params.id !== from.params.id) {
    jig.value = await loadJig(to.params.id as string)
    window.scrollTo({ top: 0 })
  }
})
</script>