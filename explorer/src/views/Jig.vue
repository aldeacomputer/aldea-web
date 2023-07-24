<template>
  <article>
    <PageHeader
      title="Jig"
      id="d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803"
      :links="graphLinks">
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex items-center justify-between p-2 gap-2 bg-neutral-800">
            <span class="text-white">₳</span>
            <div class="font-mono text-14">0.00267719</div>
          </div>
        </div>
      </template>
      <template #right-column>
        <figure class="mb-4 p-4 border border-neutral-700">
          <img src="/tmp/jigpic.jpg" class="block" />
        </figure>
        <table class="w-full text-14 xfire">
          <tr>
            <th class="pr-4 pb-1 font-normal text-neutral-400 text-left align-top">Name</th>
            <td class="pb-1 align-top">The Leader</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-neutral-400 text-left align-top">Decscription</th>
            <td class="pb-1 align-top">The leader of the Movementarians</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-neutral-400 text-left align-top">Creator</th>
            <td class="pb-1 align-top">Aldea Computer</td>
          </tr>
          <tr>
            <th class="pr-4 pb-1 font-normal text-neutral-400 text-left align-top">Link</th>
            <td class="pb-1 align-top"><a class="link underline">https://aldea.computer</a></td>
          </tr>
        </table>
      </template>
    </PageHeader>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const graphLinks = computed(() => {
  return [
    { title: 'Origin', value: '4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d480d2537340d3_2', url: '/jig' },
    { title: 'Location', value: '4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d480d2537340d3_2', url: '/jig' },
    { title: 'Class', value: 'd2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803_0', url: '/pkg' },
  ]
})
</script>