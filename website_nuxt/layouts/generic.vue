<template>
  <NuxtLayout name="default">
    <div class="p-12">
      <p class="mb-4">GENERIC LAYOUT</p>
      <div class="md">
        <slot />
      </div>

      <!-- siblings: for side column -->
      <ul>
        <li v-for="page of siblings">
          <NuxtLink :to="page._path" class="text-blue-500 underline">{{ page.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { page } = useContent()

const { data: siblings } = await useAsyncData(`siblings:${route.path}`, () => {
  return queryContent(page.value._dir)
    .where({ $not: { _id: page.value._id } })
    .find()
})
</script>