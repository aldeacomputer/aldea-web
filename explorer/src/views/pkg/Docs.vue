<template>
  <div class="flex" v-if="pkg">
    <div class="hidden lg:block w-48 xl:w-64 shrink-0 pr-4 py-6 space-y-6 border-r border-gray-70/50">
      <MenuSection title="Classes" v-if="classes.length">
        <MenuLink
          v-for="ex, i of classes"
          @click="scrollToSection(i)">
          {{ ex.name }}
        </MenuLink>
      </MenuSection>
      <MenuSection title="Interfaces" v-if="interfaces.length">
        <MenuLink
          v-for="ex, i of interfaces"
          @click="scrollToSection(i + classes.length)">
          {{ ex.name }}
        </MenuLink>
      </MenuSection>
      <MenuSection title="Functions" v-if="functions.length">
        <MenuLink
          v-for="ex, i of functions"
          @click="scrollToSection(i + classes.length + interfaces.length)">
          {{ ex.name }}
        </MenuLink>
      </MenuSection>
      <MenuSection title="Objects" v-if="objects.length">
        <MenuLink
          v-for="obj, i of objects"
          @click="scrollToSection(i + classes.length + interfaces.length + functions.length)">
          {{ obj.name }}
        </MenuLink>
      </MenuSection>
    </div>
    
    <div class="flex-auto lg:pl-8 py-6 space-y-10">
      <Markdown :content="docs.package?.description" />
      
      <DocSection title="Classes" v-if="classes.length">
        <ClassLike
          v-for="ex of classes"
          ref="sections"
          :kind="ex.kind"
          :code="ex as abi.ClassNode"
          :docs="docs.docs" />
      </DocSection>

      <DocSection title="Interfaces" v-if="interfaces.length">
        <ClassLike
          v-for="ex of interfaces"
          ref="sections"
          :kind="ex.kind"
          :code="ex as abi.InterfaceNode"
          :docs="docs.docs" />
      </DocSection>

      <DocSection title="Functions" v-if="functions.length">
        <FunctionLike
          v-for="ex of functions"
          ref="sections"
          :kind="ex.kind"
          :code="ex as abi.FunctionNode"
          :docs="docs.docs" />
      </DocSection>

      <DocSection title="Objects" v-if="objects.length">
        <ClassLike
          v-for="obj of objects"
          ref="sections"
          :code="(obj as abi.ObjectNode)"
          :docs="docs.docs" />
      </DocSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { abi } from '@aldea/sdk'
import { useAppStore } from '../../stores/app'
import { KEYS } from '../../constants'
import Markdown from '../../components/Markdown.vue'
import DocSection from '../../components/docs/DocSection.vue'
import MenuSection from '../../components/docs/MenuSection.vue'
import MenuLink from '../../components/docs/MenuLink.vue'
import ClassLike from '../../components/docs/ClassLike.vue'
import FunctionLike from '../../components/docs/FunctionLike.vue'

const route = useRoute()
const store = useAppStore()

const pkg = inject(KEYS.pkg)
const docs = ref(await loadDocs(route.params.id as string))

const sections = ref<Array<{root: HTMLElement}>>([])

const query = computed(() => {
  return new abi.AbiQuery(pkg!.value.abi).fromExports()
})

const classes = computed(() => {
  return new abi.AbiQuery(pkg!.value.abi).fromExports().byKind(abi.CodeKind.CLASS).allCode()
})

const interfaces = computed(() => {
  return query.value.byKind(abi.CodeKind.INTERFACE).allCode()
})

const functions = computed(() => {
  return query.value.byKind(abi.CodeKind.FUNCTION).allCode()
})

const objects = computed(() => {
  return query.value.byKind(abi.CodeKind.OBJECT).allCode()
})

async function loadDocs(id: string): Promise<PkgDocs> {
  return store.adapter.getDocs(id)
}

function scrollToSection(i: number) {
  const el = sections.value[i].root
  const top = el.getBoundingClientRect().top + window.scrollY - 84
  window.scrollTo({ top, behavior: 'smooth' })
}

watch(() => route.params.id, async id => {
  if (typeof route.name === 'string' && /^pkg/.test(route.name)) {
    docs.value = await loadDocs(id as string)
    window.scrollTo({ top: 0 })
  }
})

/**
 * Hack alert. When navigating away to another route, Vue throws:
 *    Unhandled error during execution of scheduler flush.
 *    Cannot read properties of null (reading 'parentNode')
 * 
 * Resolved by clearing the refs before navigating away. 🤷‍♂️
 */
onBeforeUnmount(() => { sections.value = [] })
</script>