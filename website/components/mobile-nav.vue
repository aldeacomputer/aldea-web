<template>
  <div class="bg-gray-90 h-screen flex flex-col px-5 py-4">
    <div class="flex justify-between items-center mb-6 h-9">
    <NuxtLink to="/">
        <img src="/images/logo.png" class="h-6" alt="Aldea Computer" />
    </NuxtLink>
    <CaLogoGithub class="text-white"/>
    </div>
    <nav class="md:hidden block px-2">
      <ul class="flex flex-col text-xl">
        <li v-for="node of navTree" class="p-4 text-white active:bg-gray-80 rounded-sm">
          <NuxtLink :to="node.link">{{ node.text }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="md:flex flex-col justify-between text-white">
      <ul>
        <li class="inline-block px-2" v-for="link of socialLinks">
            <a :href="link.url"
            target="_blank"
            rel="noopener noreferrer">
            <component :is="link.icon" class="w-6 h-7" />
          </a>
        </li>
      </ul>
      <p class="p-2 text-sm">Terms, Privacy & Acceptable Use</p>
      <p class="p-2 text-sm">Copyright &copy; 2023 Aldea Computer Company</p>
    </div>
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