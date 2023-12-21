<template>
  <div v-if="jigs?.length">
    <ul class="space-y-2">
      <li v-for="output of jigs">
        <OutputListItem :item="output" />
      </li>
    </ul>
  </div>

  <p class="p-4 text-helper text-center" v-else>
    This address has no jigs.
  </p>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { KEYS } from '../../constants'
import OutputListItem from '../../components/lists/OutputListItem.vue'


const jigs = inject(KEYS.jigs)
</script>