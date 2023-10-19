<template>
  <div class="h-0 opacity-0 overflow-hidden">
    <!-- SSR renders each item hidden so search engines will index it -->
    <div v-for="item of items">
      <img :src="item.image" :alt="item.title" width="240" height="240" class="block mb-3">
      <div class="px-2">
        <h4 class="mb-2 text-xl text-gray-90">{{ item.title }}</h4>
        <p class="text-sm text-gray-50">{{ item.description }}</p>
      </div>
    </div>
  </div>

  <div
    ref="el"
    class="mt-20 flex justify-center gap-8 animate-slip-left hover:pause-animation">
    <div class="w-60 shrink-0" v-for="item of dynamicItems">
      <img :src="item.image" :alt="item.title" width="240" height="240" class="block mb-3">
      <div class="px-2">
        <h4 class="mb-2 text-xl text-gray-90">{{ item.title }}</h4>
        <p class="text-sm text-gray-50">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: Usecase[];
}>()


const panelWidth = 240
const screenWidth = ref<number>(320)
const index = ref<number>(0)
const el = ref<HTMLElement>()

// Returns a number of items to fill the screen width
const dynamicItems = computed<Usecase[]>(() => {
  const n = Math.max(props.items.length, Math.ceil(screenWidth.value / panelWidth))
  const max = n % 2 == 0 ? n + 1 : n + 2
  const cases = []
  for (let i = index.value; i < max + index.value; i++) {
    cases.push(props.items[i % props.items.length])
  }
  return cases
})

onMounted(() => {
  screenWidth.value = getWidth()
  window.addEventListener('resize', setScreenWidth)

  el.value!.addEventListener('animationend', e => {
    index.value = (index.value + 1) % props.items.length
    resetAnimation()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', setScreenWidth)
})

function getWidth(): number {
  return window.innerWidth || document.documentElement.clientWidth ||  document.body.clientWidth
}

function setScreenWidth(): void {
  screenWidth.value = getWidth()
}

function resetAnimation(): void {
  el.value!.style.animation = 'none'
  el.value!.offsetHeight; // triggers reflow
  el.value!.style.animation = ''
}
</script>