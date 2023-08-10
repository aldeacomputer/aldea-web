<template>
  <div>
    <ul class="space-y-2" v-if="jigs?.length">
      <li v-for="output of jigs">
        <OutputListItem :item="output" />
      </li>
    </ul>

    <EmptyContent text="This address has no jigs." v-else />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { KEYS } from '../../constants'
import OutputListItem from '../../components/lists/OutputListItem.vue'
import EmptyContent from '../../components/EmptyContent.vue'

const jigs = inject(KEYS.jigs)
</script>