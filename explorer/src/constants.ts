import { InjectionKey, Ref } from 'vue'

export const COIN_PKG_ID = '0000000000000000000000000000000000000000000000000000000000000000'
export const COIN_CLASS  = `${COIN_PKG_ID}_0`

export const KEYS = {
  jig: Symbol() as InjectionKey<Ref<JigData>>,
  jigs: Symbol() as InjectionKey<Ref<JigData[]>>,
  pkg: Symbol() as InjectionKey<Ref<PkgData>>,
  txd: Symbol() as InjectionKey<Ref<TxData>>,

  txInputs: Symbol() as InjectionKey<Ref<JigData[]>>,
  txOutputs: Symbol() as InjectionKey<Ref<JigData[]>>,
}