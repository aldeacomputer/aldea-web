<template>
  <NuxtLayout>
    <div class="p-12">
      <p class="mb-4">BLOG PAGE</p>
      <ul class="space-y-4">
        <li v-for="post of posts">
          <h2><NuxtLink :to="post._path" class="font-bold text-blue-500">{{ post.title }}</NuxtLink></h2>
          <p>{{  post.description }}</p>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => {
  return queryContent('/blog').limit(10).find()
})
</script>