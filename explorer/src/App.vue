<template>
  <component :is="layout">
    <Suspense>
      <router-view />

      <template #fallback>
        <div class="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
          <div class="flex items-center gap-4">
            <LoadingIcon class="animate-spin" />
            <span class="text-helper">Loading...</span>
          </div>
        </div>
      </template>
    </Suspense>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HomeLayout from './layouts/Home.vue'
import DefaultLayout from './layouts/Default.vue'
import LoadingIcon from './components/LoadingIcon.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.path) {
    case '/': return HomeLayout
    default: return DefaultLayout
  }
})
</script>
