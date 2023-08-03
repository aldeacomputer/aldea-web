import { ClassNode, FieldNode, TypeNode, normalizeTypeName } from '@aldea/core/abi'

export function jigClassName(jig: Jig): string {
  const idx = Number(jig.class.split('_')[1])
  return jig.abi.exports[idx].code.name
}

export function jigFields(jig: Jig): FieldNode[] {
  const idx = Number(jig.class.split('_')[1])
  const klass = jig.abi.exports[idx].code as ClassNode
  return klass.fields
}

export function typeName(type: TypeNode): string {
  return normalizeTypeName(type)
}