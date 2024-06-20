<template>
  <BaseInstruction :idx="idx" :instruction="instruction">
    <Enclosed :icon="CaCode">
      <span class="pr-2 text-secondary text-sm">{{ callName }}</span>
    </Enclosed>
    
    <template #drop-down>
      <div class="space-y-4">
        <div class="grid grid-cols-12 items-center gap-x-4 gap-y-1" v-for="arg, i of args">
          <div class="col-start-2 col-span-11">
            <div class="flex items-center gap-3 mb-2">
              <h4 class="text-14 font-semibold text-secondary">{{ arg.name }}</h4>
              <span class="text-12 font-mono text-helper" size="sm">{{ $helpers.typeName(arg.type) }}</span>
            </div>
          </div>
          <div class="text-12 text-helper">arg {{ i }}</div>
          <div class="col-span-11">
            <component
              :is="Primitive"
              :type="arg.type"
              :value="decodedArgs[i]" />
          </div>
        </div>
        <div class="grid grid-cols-12 items-center gap-x-4 gap-y-1 border-t border-gray-80 pt-4">
          <div class="text-12 text-helper">returns</div>
          <div class="col-span-11">
            <Primitive :type="returnType" :value="$helpers.typeName(returnType)" />
          </div>
        </div>
      </div>    
    </template>
  </BaseInstruction>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRaw, unref } from 'vue'
import { BCS, OpCode, Pointer, abi, base16, instructions } from '@aldea/sdk'
import { CaCode } from '@kalimahapps/vue-icons'
import { useAppStore } from '../../stores/app'
import { KEYS } from '../../constants'
import BaseInstruction from './BaseInstruction.vue'
import Enclosed from '../Enclosed.vue'
import Primitive from '..//fields/Primitive.vue'
//import ArrayLike from '..//fields/ArrayLike.vue'
//import KeyValue from '..//fields/KeyValue.vue'
//import Nested from '..//fields/Nested.vue'
//import PointerType from '..//fields/PointerType.vue'

type StaticCallInstruction = instructions.NewInstruction | instructions.ExecInstruction //| instructions.ExecFuncInstruction

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
        const sMethod = (<abi.ClassNode>ctxCode.value).methods[(<instructions.ExecInstruction>props.instruction).exportIdx]
        return `${ctxCode.value.name}.${sMethod.name}()`
      //case OpCode.EXECFUNC:
      //  return `${ctxCode.value.name}()`
    }
  } else {
    return '<Unknown>'
  }
})

const args = computed(() => {
  if (ctxCode.value) {
    switch (props.instruction.opcode) {
      case OpCode.NEW:
        return (<abi.ClassNode>ctxCode.value).methods.find(m => m.name === 'constructor')!.args
      case OpCode.CALL:
      return (<abi.ClassNode>ctxCode.value).methods[(<instructions.CallInstruction>props.instruction).methodIdx].args
      case OpCode.EXEC:
        return (<abi.ClassNode>ctxCode.value).methods[(<instructions.ExecInstruction>props.instruction).exportIdx].args
      //case OpCode.EXECFUNC:
      //  return (<abi.FunctionNode>ctxCode.value).args
    }
  } else {
    return []
  }
})

const decodedArgs = computed(() => {
  if (ctxAbi.value) {
    const name = props.instruction.opcode === OpCode.NEW ? `${ctxCode.value!.name}_constructor` : callName.value!.replace(/\(\)$/, '')
    const bcs = new BCS(toRaw(unref(ctxAbi.value)))
    return bcs.decode(name, props.instruction.argsBuf)
  } else {
    return []
  }
})

const returnType = computed<abi.TypeNode>(() => {
  if (ctxCode.value) {
    switch (props.instruction.opcode) {
      case OpCode.NEW:
        return { name: ctxCode.value!.name, nullable: false, args: [] }
      case OpCode.CALL:
      return (<abi.ClassNode>ctxCode.value).methods[(<instructions.CallInstruction>props.instruction).methodIdx].rtype as abi.TypeNode
      case OpCode.EXEC:
        return (<abi.ClassNode>ctxCode.value).methods[(<instructions.ExecInstruction>props.instruction).exportIdx].rtype as abi.TypeNode
      //case OpCode.EXECFUNC:
      //  return (<abi.FunctionNode>ctxCode.value).rtype     
    }
  }
  return { name: 'Unknown', nullable: false, args: [] }
})

async function traverseParents(idx: number, exportIdx?: number): Promise<void> {
  const parent = tx!.value.instructions[idx]

  switch(parent.opcode) {
    case OpCode.IMPORT:
      const pkgId = base16.encode((<instructions.ImportInstruction>parent).pkgId)
      ctxAbi.value = await store.adapter.getAbi(pkgId)
      ctxCode.value = ctxAbi.value.defs[ctxAbi.value.exports[exportIdx!]] as abi.ClassNode | abi.FunctionNode
      break

    case OpCode.LOAD:
    case OpCode.LOADBYORIGIN:
      const id = parent.opcode === OpCode.LOAD ?
        base16.encode((<instructions.LoadInstruction>parent).outputId) :
        Pointer.fromBytes((<instructions.LoadByOriginInstruction>parent).origin).toString()
      ctxJig.value = await store.adapter.getJig(id)
      ctxAbi.value = ctxJig.value.abi
      const codeIdx = Number(ctxJig.value.class.split('_')[1])
      ctxCode.value = ctxAbi.value.defs[ctxAbi.value.exports[codeIdx]] as abi.ClassNode
      break

    case OpCode.NEW:
    case OpCode.EXEC:
      return traverseParents((<StaticCallInstruction>parent).idx, (<StaticCallInstruction>parent).exportIdx)
    //case OpCode.EXECFUNC:
    //  return traverseParents((<StaticCallInstruction>parent).idx, (<StaticCallInstruction>parent).exportIdx)

    case OpCode.CALL:
      return traverseParents((<instructions.CallInstruction>parent).idx)
  }
}

props.instruction.opcode === OpCode.CALL ?
  await traverseParents(props.instruction.idx) :
  await traverseParents(props.instruction.idx, (<StaticCallInstruction>props.instruction).exportIdx);
</script>