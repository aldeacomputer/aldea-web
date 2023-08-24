<template>
  <footer class="flex items-center justify-between gap-4 px-4 bg-layer-01">
    <div class="flex flex-col gap-2 py-4">
      <RouterLink to="/">
        <img src="/aldea-logo-full.svg" width="96" alt="Aldea Explorer" />
      </RouterLink>
      <p class="text-12 text-secondary">Copyright © 2023 Run Computer Company</p>
    </div>
    <div class="py-4">
      <ul class="flex items-center gap-2 md:gap-4 lg:gap-6 text-24">
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