<template>
  <article>
    <PageHeader
      title="Package"
      id="d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4d14fd0ac9e06d4803"
      :links="graphLinks">
    </PageHeader>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const graphLinks = computed(() => {
  return [
    { title: 'Tx ID', value: 'd14fd0ac9e06d4803d2537340d4b5ee7d806ad6b4f8c40b206893bb06a6de1a4', url: '/tx' },
    { title: 'Publisher', value: 'addr18kglj7mw2ypwz5rmlwytmry2sm7qa6v39lxq0t', url: '/addr' },
  ]
})

</script>