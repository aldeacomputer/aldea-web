<template>
  <div>
    <ul class="space-y-2">
      <li v-for="output of jigs">
        <OutputListItem :item="output" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import * as keys from '../../injection-keys'
import OutputListItem from '../../components/lists/OutputListItem.vue'

const jigs = inject(keys.jigs)
</script>