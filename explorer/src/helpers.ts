import { abi } from '@aldea/sdk'

export function jigClassName(jig: JigData): string {
  const idx = Number(jig.class.split('_')[1])
  return jig.abi.exports[idx].code.name
}

export function jigFields(jig: JigData): abi.FieldNode[] {
  const idx = Number(jig.class.split('_')[1])
  const klass = jig.abi.exports[idx].code as abi.ClassNode
  return klass.fields
}

export function typeName(type: abi.TypeNode): string {
  return abi.normalizeTypeName(type)
}
