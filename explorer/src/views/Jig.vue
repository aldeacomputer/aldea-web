<template>
  <article>
    <PageHeader
      title="Jig"
      id="d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803"
      class="mb-10"
      :links="graphLinks">
      <template #title-labels>
        <Label class="font-mono" size="sm">ClassName</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <Label :icon="XacIcon" border="success">
            <div class="font-mono text-14">0.00267719</div>
          </Label>
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
import { computed } from 'vue'
import { CaExpandAll, CaChangeCatalog } from '@kalimahapps/vue-icons'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'
import XacIcon from '../components/XacIcon.vue'

const graphLinks = computed(() => {
  return [
    { title: 'Origin', value: '4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d480d2537340d3_2', url: '/jig' },
    { title: 'Location', value: '4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d480d2537340d3_2', url: '/jig' },
    { title: 'Class', value: 'd2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803_0', url: '/pkg' },
  ]
})
</script>