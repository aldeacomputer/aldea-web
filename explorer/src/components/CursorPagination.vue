<template>
  <nav class="flex items-center justify-center gap-4 text-14">
    <span
      class="flex items-center gap-1"
      :class="meta.before ? 'link hover:underline' : 'text-placeholder'"
      @click.prevent="meta.before && $emit('prev', meta.before)">
      <CaCaretLeft /> Prev
    </span>
    <span
      class="flex items-center gap-1"
      :class="meta.after ? 'link hover:underline' : 'text-placeholder'"
      @click.prevent="meta.after && $emit('next', meta.after)">
      Next <CaCaretRight />
    </span>
  </nav>
</template>

<script setup lang="ts">
import { CaCaretLeft, CaCaretRight } from '@kalimahapps/vue-icons'

defineProps<{
  meta: MetaData;
}>()

defineEmits<{
  prev: [token: string];
  next: [token: string];
}>()
</script>