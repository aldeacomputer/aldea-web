<template>
  <NuxtLayout name="default">
    <div class="lg:hidden">
      <div class="inline-flex items-center w-full gap-x-1.5 bg-white px-3 py-2 text-sm ring-1 ring-inset ring-gray-300">
        <NuxtLink class="inline-flex items-center gap-2 font-mono text-sm w-full p-2">{{ page.title }}</NuxtLink>
        <CaArrowDown class="-mr-1 h-5 w-5" aria-hidden="true"></CaArrowDown>
      </div>

      
    </div>
    <div class="py-4 md:py-12 grid grid-cols-2 gap-4 md:grid-cols-8 xl:grid-cols-10">
      <div class="hidden lg:block lg:col-start-2 lg:col-span-2">
          <ul>
            <li v-for="page of siblings">
            <NuxtLink :to="page._path" class="inline-flex items-center gap-2 p-2 font-mono text-sm w-full hover:bg-slate-50 active:bg-slate-100">{{ page.title }}</NuxtLink>
            </li>
          </ul>     
      </div>

      <div class="m-4 md:m-0 col-span-6 md:col-start-2 lg:col-span-4">
        <div class="md">
        <slot />
        </div>
      </div>
    </div>

    <RelatedContent :items="relatedItems" />

  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { page } = useContent()

const { data: siblings } = await useAsyncData(`siblings:${route.path}`, () => {
  return queryContent(page.value._dir)
    .find()
})

import { CaArrowDown, CaArrowRight, } from '~/icons'

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