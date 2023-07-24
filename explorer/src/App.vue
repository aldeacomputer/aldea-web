<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HomeLayout from './layouts/Home.vue'
import DefaultLayout from './layouts/Default.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.path) {
    case '/': return HomeLayout
    default: return DefaultLayout
  }
})
</script>
