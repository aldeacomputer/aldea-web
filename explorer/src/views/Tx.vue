<template>
  <article v-if="txd">
    <PageHeader
      title="Transaction"
      :id="txd.id"
      class="mb-10">
      <template #title-labels>
        <Label type="success" :icon="CaCheckmarkOutline" size="sm">Finalized</Label>
      </template>
      <template #after-title>
        <div class="flex flex-col sm:flex-row gap-2">
          <Label :icon="CaCalendar">
            <time class="font-mono text-14">{{ timestamp }}</time>
          </Label>
          <Label :icon="CaMoney">
            <div class="font-mono space-x-1.5">
              <span class="text-14">{{ fee }}</span>
              <span class="text-12">motos</span>
            </div>
          </Label>
        </div>
      </template>
    </PageHeader>

    <TabRouterView>
      <TabLink :to="{ name: 'tx_instructions' }" :icon="CaListDropdown">Instructions</TabLink>
      <TabLink :to="{ name: 'tx_outputs' }" :icon="CaArrowsHorizontal">Inputs/Outputs</TabLink>
      <TabLink :to="{ name: 'tx_packages' }" :icon="CaBox">Packages</TabLink>
    </TabRouterView>
  </article>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import * as dayjs from 'dayjs'
import { OpCode, Output, Pointer, Tx, base16, instructions } from '@aldea/sdk'
import { CaArrowsHorizontal, CaBox, CaCalendar, CaCheckmarkOutline, CaListDropdown, CaMoney } from '@kalimahapps/vue-icons'
import { useAppStore } from '../stores/app'
import { KEYS } from '../constants'
import PageHeader from '../components/PageHeader.vue'
import Label from '../components/Label.vue'
import TabRouterView from '../components/TabRouterView.vue'
import TabLink from '../components/TabLink.vue'

const store = useAppStore()
const route = useRoute()

useHead({
  title() {
      return `Transaction ${route.params.id}`
  },
})

const txd = ref<TxData>(await loadTx(route.params.id as string))
const inputs  = ref<JigData[]>([])
const outputs = ref<JigData[]>([])

const tx = computed(() => Tx.fromHex(txd.value.rawtx!))

loadInputs()
loadOutputs()

provide(KEYS.txd, txd)
provide(KEYS.tx, tx)
provide(KEYS.txInputs, inputs)
provide(KEYS.txOutputs, outputs)

const timestamp = computed(() => {
  return dayjs
    .unix(txd.value.timestamp)
    .format('YYYY-MM-DD HH:mm')
})

const fee = computed(() => {
  return Number(999)
})

async function loadTx(id: string): Promise<TxData> {
  return store.adapter.getTx(id)
}

async function loadInputs() {
  inputs.value = []
  const instructions = tx.value.instructions
    .filter(i => i.opcode === OpCode.LOAD || i.opcode === OpCode.LOADBYORIGIN)

  for (let i of instructions) {
    const id = i.opcode === OpCode.LOAD ?
      base16.encode((<instructions.LoadInstruction>i).outputId) :
      Pointer.fromBytes((<instructions.LoadByOriginInstruction>i).origin).toString()
    inputs.value.push(await store.adapter.getJig(id))
  }
}

async function loadOutputs() {
  outputs.value = []
  for (let o of txd.value.outputs) {
    const abi = await store.adapter.getAbi(o.class.replace(/_\d+$/, ''))
    const props = Output.fromJson(o, abi).props!
    outputs.value.push({ ...o, abi, props })
  }
}

watch(() => route.params.id, async id => {
  if (typeof route.name === 'string' && /^tx/.test(route.name)) {
    txd.value = await loadTx(id as string)
    loadInputs()
    loadOutputs()
    window.scrollTo({ top: 0 })
  }
})
</script>