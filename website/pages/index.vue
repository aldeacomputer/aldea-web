<template>
  <NuxtLayout>
    <div id="top" style="height: calc(100vh-80px)">
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
    </div>

    <page-section
      id="usability"
      :icon="CaEdgeCluster"
      label="Usability & programmability"
      title="An unrivalled developer experience"
      :full-height="true">
      <template #description>
        <p>We're making Web3 possible for all developers. Our simple yet powerful programming model will have you building the decentralized future quicker than you can say "zero knowledge rollups".</p>
      </template>
      <div class="px-5 md:px-10 pt-20">
        <div class="w-full max-w-7xl mx-auto">
          <dev-carousel :items="devExamples" />
        </div>
      </div>
    </page-section>

    <page-section
      id="objects"
      :icon="CaBlockStorage"
      label="Interactive objects"
      title="Making the most exciting ideas in Web3 possible"
      :full-height="true">
      <template #description>
        <p>Aldea's simple yet powerful object model combines the best of Account and UTXO model blockchains. Think beyond tokens and smart contracts, and build a world of feature-rich, interactive and interoperable objects.</p>
      </template>
      <div class="w-full overflow-x-hidden">
        <usecase-marquee :items="usecases" />
      </div>
    </page-section>

    <page-section
      id="scale"
      :icon="CaIntentRequestScaleOut"
      label="Scale & performance"
      title="Built for global scale"
      :full-height="true">
      <template #description>
        <p>From day one, Aldea will offer a network capable of achieving significantly higher throughput compared to other mainstream chains. No sharding, no rollups and no boondoggle.</p>
      </template>
      <div class="px-5 md:px-10 pt-20">
        <div class="w-full max-w-7xl mx-auto space-y-16">
          <performance-table :data="performanceData" />
        </div>
      </div>
    </page-section>

    <page-section
      id="contact"
      :icon="CaMoney"
      label="Get involved"
      title="Help build the decentralized future"
      :dark-bg="true">
      <template #description>
        <p>We are on track to launch our testnet in early 2024. Want to see what we are building?</p>
      </template>
      <div class="space-y-8">
        <action-button
          form-id="w8zRlr"
          label="Request developer access"
          detail="Register your interest in our testnet launch." />
        <action-button
          form-id="npdkjB"
          label="Investment opportunities"
          detail="Enquire about our seed funding round." />
      </div>
    </page-section>

    <page-section
      id="about"
      :icon="CaGroup"
      label="About us"
      title="Who are Aldea?"
      :dark-bg="true"
      :full-height="true">
      <template #description>
        <p>As a team of blockchain veterans, we found the layer 1 we wanted didn't exist. So we are building it. We're driven to make the most exciting ideas in Web3 possible for anyone.</p>
      </template>
      <div class="px-5 md:px-10 pt-20">
        <div class="w-full max-w-6xl mx-auto space-y-32">
          <timeline :items="timelineYears" />
          <team :items="teamMembers" />
        </div>
      </div>
    </page-section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  CaArrowDown,
  CaBlockStorage,
  CaCheckmarkOutline,
  CaEdgeCluster,
  CaExplore,
  CaGroup,
  CaIntentRequestScaleOut,
  CaMoney,
  CaRocket,
  CaTask,
} from '~/icons'

import * as rawCode from '~/codes'

// Commenting out this block as getting some weirdo errors with this set in dev mode
//
//useSeoMeta({
//  title: 'Aldea — Building on Web3 has never been so straightforward',
//  description: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',
//
//  ogTitle: 'Aldea — Building on Web3 has never been so straightforward',
//  ogDescription: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',
//  ogType: 'website',
//  ogUrl: 'https://aldea.computer',
//  ogImage: 'https://aldea.computer/images/meta-image.png',
//
//  twitterTitle: 'Aldea — Building on Web3 has never been so straightforward',
//  twitterDescription: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',
//  twitterCard: 'summary_large_image',
//  twitterImage: 'https://aldea.computer/images/meta-image.png',
//})

const devExamples: DevExample[] = [
  {
    title: "It's just TypeScript",
    description: 'Boost your productivity using a familiar and comfortable language.',
    src: rawCode.typescript,
    lang: 'typescript',
  }, {
    title: 'Object-oriented',
    description: 'Get going faster with our simple yet powerful programming model that just makes sense.',
    src: rawCode.objects,
    lang: 'typescript',
  }, {
    title: 'Interopability and composability',
    description: 'Create new network effects with a world of objects interacting seamlessly.',
    src: rawCode.interopability,
    lang: 'typescript',
  }, {
    title: 'View source code',
    description: "Learn from and build on top of others' creations. Web1's killer feature comes to Web3!",
    src: rawCode.source,
    lang: 'text',
  }, {
    title: 'First class ownership model',
    description: 'Power up your smart contracts with our beautifully simple ownership model.',
    src: rawCode.ownership,
    lang: 'typescript',
  }, {
    title: 'Ecosystem of tools',
    description: 'Unlock your potential with our dev tools, APIs, browser wallet and explorer.',
    src: rawCode.ecosystem,
    lang: 'text',
  },
]

const usecases: Usecase[] = [
  {
    image: '/images/use-gaming.png',
    title: 'Gaming',
    description: 'The metaverse, interopable cross-game items, real-time gaming.',
  }, {
    image: '/images/use-nfts.png',
    title: 'Next generation NFTs',
    description: 'Tickets, access tokens, feature-rich interactive assets',
  }, {
    image: '/images/use-apis.png',
    title: 'Decentralized back-ends',
    description: 'Trustless APIs, distributed apps, open data protocols',
  }, {
    image: '/images/use-betting.png',
    title: 'Sports betting',
    description: 'Fantasy sports gaming, decentralized leaderboards',
  }, {
    image: '/images/use-finance.png',
    title: 'Finance',
    description: 'Decentralized exchanges, high frequency trading, payments',
  },
]

const performanceData: PerformanceRow[] = [
  { name: 'Ethereum', tps: '30', vs: '0.00003' },
  { name: 'Solana', tps: '65,000', vs: '0.065' },
  { name: 'Aptos', tps: '160,000', vs: '0.16' },
  { name: 'Sui', tps: '160,000', vs: '0.16' },
]

const teamMembers: TeamMember[] = [
  {
    image: '/images/brenton.png',
    name: 'Brenton Gunning',
    role: 'CEO, Engineering',
  }, {
    image: '/images/migue.png',
    name: 'Miguel Duarte',
    role: 'Engineering',
  }, {
    image: '/images/aaron.png',
    name: 'Aaron Russell',
    role: 'Engineering',
  }, {
    image: '/images/ani.png',
    name: 'Anabella Rizzi',
    role: 'Design',
  }, {
    image: '/images/rius.png',
    name: 'Rius Chua',
    role: 'Partnerships',
  },
]

const timelineYears: TimelineItem[] = [
  {
    icon: CaCheckmarkOutline,
    year: 2022,
    description: 'Plans are hatched, first lines of code written.',
  }, {
    icon: CaExplore,
    year: 2023,
    description: 'MVP mocknet, dev tools, explorer, and wallet.',
  }, {
    icon: CaTask,
    year: 2023,
    description: 'Q4 Devnet launches. Early access developer program.',
  }, {
    icon: CaRocket,
    year: 2024,
    description: 'Q1 Testnet launches. Q2 Mainnet launches.',
  },
]
</script>