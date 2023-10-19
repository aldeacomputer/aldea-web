<template>
  <footer class="px-5 md:px-10 py-12 md:py-20 bg-gray-100 text-cream-20">
    <div class="w-full max-w-7xl mx-auto md:flex flex-row-reverse justify-between gap-4">
      <div class="mb-20 md:mb-0">
        <ul class="mb-10 font-mono text-sm text-right space-y-5">
          <li v-for="s of sections">
            <a
              :href="anchor(s.id)"
              class="underline decoration-transparent hover:text-white hover:decoration-inherit transition-colors"
              data-scroll="true">
              {{s.name}}
            </a>
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
</template>

<script setup lang="ts">
defineProps<{
  sections: PageSection[];
  socialLinks: SocialLink[];
}>()

const anchor = (id: string): string => `#${id}`
</script>