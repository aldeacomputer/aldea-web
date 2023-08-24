<template>
  <div class="w-full max-w-md space-y-7">
    <img src="/404.png" width="360" alt="404 error" class="block mx-auto" />
    <h1 class="text-42 font-light text-center">{{ resource }} not found</h1>
    <p class="text-20 text-secondary text-center">The resource you are looking for is temporarily unavailable, or does not exist.</p>
    <div class="mx-auto text-center">
      <Button to="/">
        Back to home
      </Button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import Button from '../components/Button.vue'

useHead({
  title: 'Not found'
})

const route = useRoute()

const resource = computed(() => {
  switch (route.params.slug[0]) {
    case 'tx': return 'Transaction'
    case 'jig': return 'Jig'
    case 'pkg': return 'Package'
    case 'addr': return 'Address'
    default : return 'Page'
  }
})
</script>