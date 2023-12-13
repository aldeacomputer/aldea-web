<template>
  <div class="md:grid grid-cols-10 gap-4">
    <div class="hidden md:block col-span-4">
      <ul>
        <li
          v-for="item, i of items"
          class="hover:bg-white/75 transition-colors cursor-pointer"
          :class="isActive(i) ? 'text-gray-90' : 'text-gray-50'"
          @click="selectItem(i)">
          <div class="px-2 lg:px-4 py-4">
            <h4 class="mb-1 text-xl">{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
          <div
            class="progress-bar-slim"
            :class="{'is-active': isActive(i)}"></div>
        </li>
      </ul>
      <p class="mt-12 text-gray-70">
        <a
          href="https://www.youtube.com/watch?v=h6actzI2cz0"
          class="inline-flex items-center gap-2 group"
          target="_blank"
          rel="noopener noreferrer">
          <CaPlayOutline class="w-5 h-5 text-blue-lighter" />
          <span class="underline decoration-transparent group-hover:text-gray-90 group-hover:decoration-inherit transition-colors">
            Watch what it's like to
            <strong class="font-semibold">Code with Aldea</strong>
          </span>
        </a>
      </p>
    </div>

    <div class="col-span-6 lg:col-span-5 lg:col-start-6">
      <div class="-mx-5 sm:mx-0 p-6 md:p-8 lg:p-12 bg-white">
        <div class="rounded overflow-hidden">
          <div class="flex items-center gap-3 px-4 py-3 bg-gray-90">
            <CaDotMark class="w-4 h-4 text-gray-10" />
            <span
              class="font-mono text-sm text-gray-20 text-ellipsis overflow-hidden whitespace-nowrap">
              {{ items[index].title }}
            </span>
          </div>
          <code-writer :code="items[index]" />
        </div>
      </div>
      <div class="md:hidden pt-12 space-y-12">
        <ul>
          <li
            v-for="item, i of items"
            class="text-gray-90"
            :class="{'hidden': !isActive(i)}">
            <div class="py-4">
              <h4 class="mb-1 text-xl">{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
            <div
              class="progress-bar-slim"
              :class="{'is-active': isActive(i)}"></div>
          </li>
        </ul>
        <div class="flex items-center justify-between">
          <a
            class="text-blue-primary hover:text-blue-lighter transition-colors"
            @click="selectPrev()">
            <CaArrowRight class="w-6 h-6 rotate-180" />
          </a>
          <ul class="flex items-center justify-center gap-4">
            <li v-for="_item, i of items">
              <span
                class="block h-2.5 w-2.5 cursor-pointer"
                :class="isActive(i) ? 'bg-blue-lighter' : 'bg-gray-30'"></span>
            </li>
          </ul>
          <a
            class="text-blue-primary hover:text-blue-lighter transition-colors"
            @click="selectNext()">
            <CaArrowRight class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaArrowRight, CaDotMark, CaPlayOutline } from '~/icons'

const props = defineProps<{
  items: DevExample[];
}>()

const LOOP_INTERVAL = 8300

const index = ref<number>(0)
const loop = ref<ReturnType<typeof setInterval>>()

function startLoop(): void {
  loop.value = setInterval(() => {
    index.value = (index.value + 1) % props.items.length
  }, LOOP_INTERVAL)
}

function selectItem(i: number): void {
  clearInterval(loop.value)
  index.value = i
  startLoop()
}

function selectPrev(): void {
  clearInterval(loop.value)
  const nextIdx = index.value - 1
  index.value = nextIdx < 0 ? props.items.length + nextIdx : nextIdx
  startLoop()
}

function selectNext(): void {
  clearInterval(loop.value)
  const nextIdx = index.value + 1
  index.value = nextIdx % props.items.length
  startLoop()
}

onMounted(() => startLoop())

const isActive = (i: number): boolean => i == index.value
</script>

<style scoped>
.progress-bar-slim {
  @apply relative bg-gray-20;
  height: 1px;
}

.progress-bar-slim::after {
  @apply absolute top-0 left-0 w-0 bg-blue-lighter;
  content: ' ';
  height: 1px;
}

.progress-bar-slim.is-active::after {
  @apply animate-progress;
}
</style>