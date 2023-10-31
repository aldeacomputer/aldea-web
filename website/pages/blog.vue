<template>
  <NuxtLayout>
      <div class="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 animate-fade-up">
        <div class="py-8 md:py-12 px-4 lg:px-0 col-span-4 md:col-span-8 lg:col-start-2">
          <h1 class="font-light text-4xl mb-8">Blog Page</h1>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-6">
            <li v-for="post of posts" class="pb-4 grayscale hover:filter-none">
              <NuxtLink :to="post._path" class="text-2xl">
                <img src= "https://unsplash.it/600/300" class="w-full"/>
                <div class="px-2">
                  <span class="font-medium font-mono text-sm text-gray-60">{{ $formatDate(post.pubdate) }}</span>
                  <h2 class="mb-2">{{ post.title }}</h2>
                  <p class="text-base mb-4">{{ post.summary }}</p>
                  <div class="flex items-center gap-2">
                    <img src="https://unsplash.it/24/24" class="rounded-full">
                    <span class="text-sm">Posted by: <strong>{{ post.author }}</strong></span>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <RelatedContent :items="relatedItems" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $formatDate } = useNuxtApp()

const { data: posts } = await useAsyncData('blog', () => {
  return queryContent('blog')
    .limit(10)
    .sort({ pubdate: -1 })
    .find()
})


import {
  CaArrowRight,
} from '~/icons'

const relatedItems: RelatedItem[] = [
  {
    icon: CaArrowRight,
    title: "Docs",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non sodales odio.',
    link: "",
  },
  {
    icon: CaArrowRight,
    title: "About",
    description: "What Aldea is and how it works",
    link: "",
  },
  {
    icon: CaArrowRight,
    title: "Tutorial",
    description: "Learn how to code with Aldea",
    link: "",
  }
]
</script>