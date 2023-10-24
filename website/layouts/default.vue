<template>
  <div class="flex flex-col min-h-screen">
    <header class="w-full h-20 px-5 md:px-10 py-5 text-light bg-gray-100 flex items-center justify-between">
      <NuxtLink to="/">
        <img src="/images/logo.png" width="120" alt="Aldea Computer" />
      </NuxtLink>
      <div class="hidden md:block">
        <nav>
          <ul class="flex gap-4 font-mono text-sm">
            <li v-for="node of navTree">
              <NuxtLink :to="node.link">{{ node.text }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-auto w-full">
      <slot />
    </main>

    <footer class="w-full px-5 md:px-10 py-12 md:py-20 bg-gray-100 text-cream-20">
      <div class="w-full max-w-7xl mx-auto md:flex flex-row-reverse justify-between gap-4">
        <div class="mb-20 md:mb-0">
          <ul class="mb-10 font-mono text-sm text-right space-y-5">
            <li v-for="node of navTree">
              <NuxtLink
                :to="node.link"
                class="underline decoration-transparent hover:text-white hover:decoration-inherit transition-colors">
                {{  node.text }}
              </NuxtLink>
            </li>
          </ul>

          <ul class="space-x-4 text-right">
            <li class="inline-block" v-for="link of socialLinks">
              <a :href="link.url"
                target="_blank"
                rel="noopener noreferrer">
                <component :is="link.icon" class="w-8 h-8" />
              </a>
            </li>
          </ul>
        </div>

        <div class="md:flex flex-col justify-between">
          <img src="/images/logo.png" width="160" alt="Aldea Computer" class="block mx-auto md:mx-0 mb-12" />
          <p class="text-sm text-center mf:text-left">Copyright &copy; 2023 Aldea Computer Company</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  CaLogoTwitter,
  CaLogoLinkedin,
  CaLogoGithub,
} from '~/icons'

const navTree: NavLink[] = [
  {
    text: 'Blog',
    link: '/blog',
  }, {
    text: 'About',
    link: '/about/faqs',
  }, {
    text: 'Docs',
    link: 'https://docs.aldea.computer',
  }
]

const socialLinks: SocialLink[] = [
  { icon: CaLogoTwitter, url: 'https://twitter.com/aldeacomputer' },
  { icon: CaLogoLinkedin, url: 'https://www.linkedin.com/company/aldea-computer/' },
  { icon: CaLogoGithub, url: 'https://github.com/orgs/aldeacomputer' },
]
</script>