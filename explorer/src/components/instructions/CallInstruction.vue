<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <div class="flex items-center gap-4">
      <ShortLink :icon="CaCode">
        <span class="pr-2 text-secondary text-sm">{{ callName }}</span>
      </ShortLink>
    </div>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { OpCode, Pointer, abi, base16, instructions } from '@aldea/sdk'
import { CaCode } from '@kalimahapps/vue-icons'
import { useAppStore } from '../../stores/app'
import { KEYS } from '../../constants'
import BaseInstruction from './BaseInstruction.vue'
import ShortLink from '../ShortLink.vue'

type StaticCallInstruction = instructions.NewInstruction | instructions.ExecInstruction | instructions.ExecFuncInstruction

const props = defineProps<{
  idx: number;
  instruction: instructions.CallInstruction | StaticCallInstruction;
}>()

const store = useAppStore()
const tx = inject(KEYS.tx)

const ctxAbi = ref<abi.Abi>()
const ctxJig = ref<JigData>()
const ctxCode = ref<abi.ClassNode | abi.FunctionNode>()

const callName = computed(() => {
  if (ctxCode.value) {
    switch (props.instruction.opcode) {
      case OpCode.NEW:
        return `new ${ctxCode.value.name}()`
      case OpCode.CALL:
        const iMethod = (<abi.ClassNode>ctxCode.value).methods[(<instructions.CallInstruction>props.instruction).methodIdx]
        return `${ctxCode.value.name}$${iMethod.name}()`
      case OpCode.EXEC:
        const sMethod = (<abi.ClassNode>ctxCode.value).methods[(<instructions.ExecInstruction>props.instruction).methodIdx]
        return `${ctxCode.value.name}.${sMethod.name}()`
      case OpCode.EXECFUNC:
        return `${ctxCode.value.name}()`
    }
  } else {
    return '<Unknown>'
  }
})

async function traverseParents(idx: number, exportIdx?: number): Promise<void> {
  const parent = tx!.value.instructions[idx]

  switch(parent.opcode) {
    case OpCode.IMPORT:
      const pkgId = base16.encode((<instructions.ImportInstruction>parent).pkgId)
      ctxAbi.value = await store.adapter.getAbi(pkgId)
      ctxCode.value = ctxAbi.value.exports[exportIdx!].code as abi.ClassNode | abi.FunctionNode
      break

    case OpCode.LOAD:
    case OpCode.LOADBYORIGIN:
      const id = parent.opcode === OpCode.LOAD ?
        base16.encode((<instructions.LoadInstruction>parent).outputId) :
        Pointer.fromBytes((<instructions.LoadByOriginInstruction>parent).origin).toString()
      ctxJig.value = await store.adapter.getJig(id)
      ctxAbi.value = ctxJig.value.abi
      const codeIdx = Number(ctxJig.value.class.split('_')[1])
      ctxCode.value = ctxAbi.value.exports[codeIdx].code as abi.ClassNode
      break

    case OpCode.NEW:
    case OpCode.EXEC:
    case OpCode.EXECFUNC:
      return traverseParents((<StaticCallInstruction>parent).idx, (<StaticCallInstruction>parent).exportIdx)

    case OpCode.CALL:
      return traverseParents((<instructions.CallInstruction>parent).idx)
  }
}

props.instruction.opcode === OpCode.CALL ?
  await traverseParents(props.instruction.idx) :
  await traverseParents(props.instruction.idx, (<StaticCallInstruction>props.instruction).exportIdx);
</script>