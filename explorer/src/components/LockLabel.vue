<template>
  <Label :icon="icon" border="info" size="lg">
    <div class="flex items-center gap-2 xs:gap-4">
      <span>{{ label }}</span>
      <Enclosed :icon="linkIcon" v-if="showLink">
        <Copyable :to="linkParams" :value="linkValue" short size="sm" />
      </Enclosed>
    </div>
  </Label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Address, LockResponse, LockType, base16 } from '@aldea/sdk'
import { CaLocked, CaPassword, CaSettings, CaSnowflake } from '@kalimahapps/vue-icons'
import Label from './Label.vue'
import Enclosed from './Enclosed.vue'
import Copyable from './Copyable.vue'

const props = defineProps<{
  lock: LockResponse;
}>()

const icon = computed(() => {
  return props.lock.type === LockType.FROZEN ? CaSnowflake : CaLocked
})

const label = computed(() => {
  switch (props.lock.type) {
    case LockType.ADDRESS: return 'Address'
    case LockType.JIG: return 'Jig'
    case LockType.PUBLIC: return 'Public'
    case LockType.FROZEN: return 'Frozen'
    default: return 'Unlocked'
  }
})

const showLink = computed(() => {
  return [LockType.ADDRESS, LockType.JIG].includes(props.lock.type)
})

const linkIcon = computed(() => {
  return props.lock.type === LockType.ADDRESS ? CaPassword : CaSettings
})

const linkParams = computed(() => {
  if (props.lock.type === LockType.ADDRESS) {
    const addr = new Address(base16.decode(props.lock.data))
    return { name: 'addr', params: { id: addr.toString() } }
  } else {
    return { name: 'jig', params: { id: props.lock.data } }
  }
})

const linkValue = computed(() => {
  if (props.lock.type === LockType.ADDRESS) {
    const addr = new Address(base16.decode(props.lock.data))
    return addr.toString()
  } else {
    return props.lock.data
  }
})
</script>