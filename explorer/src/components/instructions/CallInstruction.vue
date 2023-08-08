<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <ShortLink :icon="CaCode">
      <span class="pr-2 text-secondary text-sm">{{ callName }}</span>
    </ShortLink>
    
    <template #drop-down>
      <p>Decoded args will go here</p>
      <p>Decoded args will go here</p>
      <p>Decoded args will go here</p>
    </template>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
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

const callName = ref('<Loading...>')

try {
  const code = props.instruction.opcode === OpCode.CALL ?
    await loadCode(props.instruction.idx) :
    await loadCode(props.instruction.idx, (<StaticCallInstruction>props.instruction).exportIdx);

  switch (props.instruction.opcode) {
    case OpCode.NEW:
      callName.value = `new ${code.name}()`
      break
    case OpCode.CALL:
      const iMethod = (<abi.ClassNode>code).methods[(<instructions.CallInstruction>props.instruction).methodIdx]
      callName.value = `${code.name}$${iMethod.name}()`
      break
    case OpCode.EXEC:
      const sMethod = (<abi.ClassNode>code).methods[(<instructions.ExecInstruction>props.instruction).methodIdx]
      callName.value = `${code.name}.${sMethod.name}()`
      break
    case OpCode.EXECFUNC:
      callName.value = `${code.name}()`
      break
  }
} catch(_e) {
  callName.value = `<Error>`
}

/**
 * Recursive look backwards through the TX and 
 */
async function loadCode(idx: number, exportIdx?: number): Promise<abi.ClassNode | abi.FunctionNode> {
  const parent = tx!.value.instructions[idx]

  switch(parent.opcode) {
    case OpCode.IMPORT:
      const pkgId = base16.encode((<instructions.ImportInstruction>parent).pkgId)
      const pkgAbi = await store.adapter.getAbi(pkgId)
      return pkgAbi.exports[exportIdx!].code as abi.ClassNode | abi.FunctionNode

    case OpCode.LOAD:
    case OpCode.LOADBYORIGIN:
      const id = parent.opcode === OpCode.LOAD ?
        base16.encode((<instructions.LoadInstruction>parent).outputId) :
        Pointer.fromBytes((<instructions.LoadByOriginInstruction>parent).origin).toString()
      const jig = await store.adapter.getJig(id)
      const codeIdx = Number(jig.class.split('_')[1])
      return jig.abi.exports[codeIdx].code as abi.ClassNode

    case OpCode.NEW:
    case OpCode.EXEC:
    case OpCode.EXECFUNC:
      return loadCode((<StaticCallInstruction>parent).idx, (<StaticCallInstruction>parent).exportIdx)

    case OpCode.CALL:
      return loadCode((<instructions.CallInstruction>parent).idx)

    default:
      throw new Error('too confused to follow so lets just throw')
  }
}
</script>