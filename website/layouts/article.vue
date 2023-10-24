<template>
  <NuxtLayout name="default">
    <div class="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 animate-fade-up">
      <div class="py-12 mx-4 lg:mx-0 col-span-4 md:col-start-2 md:col-span-6 lg:col-start-3">
        <img src="https://unsplash.it/1000/240" class="w-full mb-4">  
        <div class="md">
          <slot />
          <div class="flex items-center gap-4 mb-24">
            <img src="https://unsplash.it/44/44" class="rounded-full h-11">
              <div>
                <span class="text-md block">Posted by: <strong>{{ page.author }}</strong></span>
                <span class="text-sm mb-0">{{ page.pubdate }}</span>
              </div>
          </div>      
        </div>
        

        <p class="mb-4">Recent posts</p>
          <ul class="md:flex gap-4 mb-8">
            <li v-for="page of posts" class="mb-6">
              <NuxtLink :to="page._path">
                <img src= "https://unsplash.it/400/200" class="mb-2 w-full md:min-win-400"/>
                <h2 class="text-xl">{{ page.title }}</h2>
                <span class="text-xs">{{ page.pubdate }}</span>
              </NuxtLink>
            </li>
          </ul>

      </div>
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