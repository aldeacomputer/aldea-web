<template>
  <div class="w-full max-w-md space-y-2">
    <div>
      <img src="/aldea-ex-logo.svg" alt="Aldea Explorer" class="w-72 md:w-80" />
    </div>
    
    <SearchTrigger on-home />
    <NetworkSwitch on-home />

    <div class="pt-12" v-if="store.network === 'mocknet'">
      <div class="flex gap-4 p-4 bg-layer-01 border border-l-4 border-info rounded-sm">
        <div class="pt-0.5">
          <CaInformationFilled class="text-info" />
        </div>
        <div>
          <h4 class="text-14 font-semibold">Mocknet</h4>
          <p class="text-14 text-secondary">Ensure mocknet is running locally on port 4000.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full max-w-md lg:max-w-4xl pb-16" v-if="showStreams">
    <StreamToggle v-model="isStreaming" />

    <div class="flex w-full gap-4 lg:gap-8 flex-col lg:flex-row">
      <div class="flex-1">
        <StreamingBlocks :is-streaming="isStreaming" />
      </div>
      <div class="flex-1">
        <StreamingTxns :is-streaming="isStreaming" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { CaInformationFilled } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import SearchTrigger from '../components/SearchTrigger.vue'
import NetworkSwitch from '../components/NetworkSwitch.vue'
import StreamToggle from '../components/StreamToggle.vue'
import StreamingBlocks from '../components/StreamingBlocks.vue'
import StreamingTxns from '../components/StreamingTxns.vue'
import { computed } from 'vue'

const store = useAppStore()

useHead({
  title: 'Explorer'
})

const isStreaming = ref(false)

const showStreams = computed<boolean>(() => {
  return ['devnet'].includes(store.network)
})
</script>