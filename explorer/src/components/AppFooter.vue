<template>
  <footer class="md:flex flex-row-reverse items-center justify-between gap-4 p-4 md:py-0 bg-layer-01">
    <div class="flex justify-center py-4">
      <ul class="flex items-center gap-6 pb-4 px-8 xs:px-16 md:px-0 md:pb-0 text-24 border-b border-gray-80 md:border-none">
        <li v-for="{icon, url} of socialLinks">
          <a
            :href="url"
            target="_blank"
            class="text-secondary hover:text-white transition-colors">
            <component :is="icon" />
          </a>
        </li>
      </ul>
    </div>
    <div class="flex flex-col items-center md:items-start gap-4 md:gap-2 pt-4 pb-6 md:pb-4">
      <RouterLink to="/">
        <img src="/aldea-logo-full.svg" width="96" alt="Aldea Explorer" />
      </RouterLink>
      <p class="text-12 text-secondary">Copyright © 2023 Run Computer Company</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CaLogoGithub, CaLogoLinkedin, CaLogoTwitter } from '@kalimahapps/vue-icons'

const socialLinks = [
  { icon: CaLogoTwitter, url: 'https://twitter.com/aldeacomputer' },
  { icon: CaLogoLinkedin, url: 'https://www.linkedin.com/company/aldea-computer/' },
  { icon: CaLogoGithub, url: 'https://github.com/orgs/aldeacomputer' },
]
</script>