<template>
  <header id="top" class="flex flex-col lg:min-h-screen">
    <div class="h-20 px-5 md:px-10 py-5 text-light bg-gray-100 flex items-center justify-between">
      <img src="/images/logo.png" width="120" alt="Aldea Computer" />
      <div class="hidden md:block">
        <p class="font-mono text-sm text-right">
          We are raising a seed funding round.
          <a
            href="#contact"
            class="inline-flex items-center hover:text-white transition-colors group"
            data-scroll="true">
            <span class="underline decoration-transparent group-hover:decoration-inherit transition-colors">Book a call</span>
            <CaArrowDown class="h-5 w-5 group-hover:translate-y-2 transition-transform" />
          </a>
        </p>
      </div>
    </div>

    <div class="px-5 md:px-10 py-10 flex flex-col items-center justify-between flex-auto">
      <div></div>
      <div class="w-full max-w-7xl md:grid grid-cols-10 items-center gap-4">
        <div class="py-12 col-span-7 lg:col-span-6 animate-fade-up">
          <h1 class="mb-8 text-4xl lg:text-6xl font-light leading-extratight">
            Building on Web3 has never been so straightforward
          </h1>
          <p class="text-xl lg:text-xl font-light leading-snug">
            We are creating the best blockchain for app developers. Turbocharge
            your on-chain development with Aldea, a new Layer 1 with a novel and
            highly intuitive programming model.
          </p>
          <a
            href="#usability"
            class="
              mt-12 pl-4 pr-5 py-2 inline-flex items-center gap-2 bg-gray-90 text-gray-10
              hover:bg-gray-80 hover:text-white transition-colors cursor-pointer group"
            data-scroll="true">
            <CaArrowDown class="h-5 w-5 group-hover:translate-y-2 transition-transform" />
            <span class="block font-medium text-base leading-loose">Find out more</span>
          </a>
        </div>
        <div class="col-span-3 lg:col-span-4 overflow-visible">
          <lottie-player
            src="https://lottie.host/e49615e7-36b7-41ed-8cce-b5040738803c/MTlA6PSwaj.json"
            class="block w-full max-w-sm mx-auto md:mx-0 animate-fade-in"
            loop="true"
            autoplay="true"></lottie-player>
        </div>
      </div>
      <div class="w-full max-w-7xl">
        <img
          src="/images/city.png"
          srcset="/images/city.png, /images/city@2x.png 2x"
          class="hidden md:block w-full h-auto animate-fade-up-slow" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { CaArrowDown } from '~/icons'
</script>