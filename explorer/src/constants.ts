import { InjectionKey, Ref } from 'vue'
import { Tx } from '@aldea/sdk'

export const COIN_PKG_ID = '0000000000000000000000000000000000000000000000000000000000000000'
export const COIN_CLASS  = `${COIN_PKG_ID}_0`

export const KEYS = {
  jig: Symbol() as InjectionKey<Ref<JigData>>,
  jigs: Symbol() as InjectionKey<Ref<JigData[]>>,
  pkg: Symbol() as InjectionKey<Ref<PkgData>>,
  txd: Symbol() as InjectionKey<Ref<TxData>>,
  txds: Symbol() as InjectionKey<Ref<DataOf<TxDataMin>>>,

  tx: Symbol() as InjectionKey<Ref<Tx>>,
  txInputs: Symbol() as InjectionKey<Ref<JigData[]>>,
  txOutputs: Symbol() as InjectionKey<Ref<JigData[]>>,
}
