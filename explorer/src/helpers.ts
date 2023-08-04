import { ClassNode, FieldNode, TypeNode, normalizeTypeName } from '@aldea/core/abi'

export function jigClassName(jig: JigData): string {
  const idx = Number(jig.class.split('_')[1])
  return jig.abi.exports[idx].code.name
}

export function jigFields(jig: JigData): FieldNode[] {
  const idx = Number(jig.class.split('_')[1])
  const klass = jig.abi.exports[idx].code as ClassNode
  return klass.fields
}

export function typeName(type: TypeNode): string {
  return normalizeTypeName(type)
}
