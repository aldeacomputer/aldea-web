<template>
  <page-header />

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

  <page-footer :sections="sections" :social-links="socialLinks" />
</template>

<script setup lang="ts">
import {
  CaBlockStorage,
  CaCheckmarkOutline,
  CaEdgeCluster,
  CaExplore,
  CaGroup,
  CaIntentRequestScaleOut,
  CaLogoTwitter,
  CaLogoLinkedin,
  CaLogoGithub,
  CaMoney,
  CaRocket,
  CaTask,
} from '~/icons'

import * as rawCode from './code-examples'

useSeoMeta({
  title: 'Aldea — Building on Web3 has never been so straightforward',
  description: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',

  ogTitle: 'Aldea — Building on Web3 has never been so straightforward',
  ogDescription: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',
  ogType: 'website',
  ogUrl: 'https://aldea.computer',
  ogImage: 'https://aldea.computer/images/meta-image.png',

  twitterTitle: 'Aldea — Building on Web3 has never been so straightforward',
  twitterDescription: 'We are creating the best blockchain for app developers. Turbocharge your on-chain development with Aldea, a new Layer 1 with a novel and highly intuitive programming model.',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://aldea.computer/images/meta-image.png',
})

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

const sections: PageSection[] = [
  { name: 'Usability & programmability', id: 'usability' },
  { name: 'Interactive objects', id: 'objects' },
  { name: 'Scale & performance', id: 'scale' },
  { name: 'Get involved', id: 'contact' },
  { name: 'About us', id: 'about' },
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

const socialLinks: SocialLink[] = [
  { icon: CaLogoTwitter, url: 'https://twitter.com/aldeacomputer' },
  { icon: CaLogoLinkedin, url: 'https://www.linkedin.com/company/aldea-computer/' },
  { icon: CaLogoGithub, url: 'https://github.com/orgs/aldeacomputer' },
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