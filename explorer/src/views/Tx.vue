<template>
  <article>
    <PageHeader
      title="Transaction"
      id="d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803"
      :links="graphLinks">
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex items-center justify-between p-2 gap-3 bg-neutral-800">
            <CaCalendar class="text-white" />
            <time class="font-mono text-14">2023-02-20 15:12</time>
          </div>
          <div class="flex items-center justify-between p-2 gap-2 bg-neutral-800">
            <CaMoney class="text-white" />
            <div class="font-mono space-x-1.5">
              <span class="text-14">100</span>
              <span class="text-12">motos</span>
            </div>
          </div>
        </div>
      </template>
      <template #title-labels>
        <Label type="warning" slot="" :icon="CaInformation">Pending</Label>
      </template>
      <template #right-column>
        <Button :icon="CaAdd" class="mt-2">Broadcast Transaction</Button>
      </template>
    </PageHeader>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CaAdd, CaCalendar, CaInformation, CaMoney } from '@kalimahapps/vue-icons'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import Button from '../components/Button.vue'


const graphLinks = computed(() => {
  return [
    { title: 'Block ID', value: 'd14fd0ac9e06d4803d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4', url: '/block' },
    { title: 'Address', value: 'addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t', url: '/addr' },
  ]
})

</script>