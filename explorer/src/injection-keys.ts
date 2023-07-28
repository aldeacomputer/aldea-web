import type { InjectionKey, Ref } from 'vue'
import type { Abi } from '@aldea/core/abi'
import type { CommitTxResponse, OutputResponse, PackageResponse, Tx } from '@aldea/sdk'

export const extendedTx = Symbol() as InjectionKey<Ref<CommitTxResponse | undefined>>
export const tx = Symbol() as InjectionKey<Ref<Tx | undefined>>

export const abi = Symbol() as InjectionKey<Ref<Abi | undefined>>
export const pkg = Symbol() as InjectionKey<Ref<PackageResponse | undefined>>

export const addrJigs = Symbol() as InjectionKey<Ref<OutputResponse[]>>