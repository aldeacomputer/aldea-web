<template>
  <section
    :id="id"
    class="flex flex-col items-center py-12 md:py-16 lg:py-24"
    :class="{
      'bg-gray-90 text-cream-20': darkBg,
      'min-h-screen': fullHeight,
    }">

    <div class="mx-5 md:mx-10">
      <div class="flex flex-col w-full max-w-7xl">
        <div
          class="mb-8 flex items-center gap-2 font-mono text-sm"
          :class="{'text-gray-70': !darkBg}">
          <component :is="icon" class="icon w-4 h-4 text-blue-lighter" />
          {{ label }}
        </div>

        <div class="lg:grid grid-cols-10 gap-4">
          <div class="col-span-4">
            <h1 class="mb-8 text-3xl lg:text-4xl font-light">{{ title }}</h1>
            <div
              class="mb-8" v-if="!fullHeight"
              :class="{'text-gray-70': !darkBg}">
              <slot name="description" />
            </div>
          </div>
          <div class="col-span-4 col-start-7">
            <div
              v-if="fullHeight"
              :class="{'text-gray-70': !darkBg}">
              <slot name="description" />
            </div>
            <div v-else>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-center flex-auto w-full" v-if="fullHeight">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  id: string;
  icon: any;
  label: string;
  title: string;
  darkBg?: boolean;
  fullHeight?: boolean;
}>(), {
  darkBg: false,
  fullHeight: false,
})
</script>