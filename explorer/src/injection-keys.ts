import { InjectionKey, Ref } from 'vue'
import { Tx } from '@aldea/sdk'

export const jig = Symbol() as InjectionKey<Ref<JigData>>
export const jigs = Symbol() as InjectionKey<Ref<JigData[]>>
export const pkg = Symbol() as InjectionKey<Ref<PkgData>>
export const txd = Symbol() as InjectionKey<Ref<TxData>>
export const tx = Symbol() as InjectionKey<Ref<Tx>>
