<template>
  <NuxtLayout name="default">
    <div class="p-12">
      <p class="mb-4">ARTICLE LAYOUT</p>
      <div class="md">
        <slot />
      </div>

      <!-- recents posts: for side column -->
      <ul>
        <li v-for="page of posts">
          <NuxtLink :to="page._path" class="text-blue-500 underline">{{ page.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>


<script setup lang="ts">
const route = useRoute()
const { page } = useContent()

const { data: posts } = await useAsyncData(`recent:${route.path}`, () => {
  return queryContent('blog')
    .where({ _id: { $not: page.value._id } })
    .sort({ pubdate: -1 })
    .limit(10)
    .find()
})
</script>