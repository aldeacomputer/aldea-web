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
import { computed, onErrorCaptured } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { HTTPError } from 'ky'
import BlankLayout from './layouts/Blank.vue'
import HomeLayout from './layouts/Home.vue'
import DefaultLayout from './layouts/Default.vue'
import LoadingIcon from './components/LoadingIcon.vue'

const route = useRoute()
const router = useRouter()

useHead({
  title: 'Explorer',
  titleTemplate: '%s | Aldea Computer'
})

const layout = computed(() => {
  switch (route.name) {
    case '404':
      return BlankLayout
    case 'home':
      return HomeLayout
    default: return DefaultLayout
  }
})

onErrorCaptured<Error | HTTPError>((e) => {
  if (
    e.message === 'invalid address' ||
    ('response' in e && (
      e.response.status === 404 || e.response.status === 400
    ))
  ) {
    router.push({
      name: '404',
      params: { slug: route.path.substring(1).split('/') },
      query: route.query,
      hash: route.hash,
    })
    return false
  }
})
</script>
