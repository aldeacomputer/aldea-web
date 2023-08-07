import { abi } from '@aldea/sdk'

export type LookupResult =
  { type: 'jig', data: JigData } |
  { type: 'pkg', data: PkgData } |
  { type: 'tx', data: TxData }

export interface ChainAdapter {
  getAddrJigs(addr: string): Promise<JigData[]>;
  getJig(jigId: string): Promise<JigData>;
  getAbi(pkgId: string): Promise<abi.Abi>;
  getPkg(pkgId: string): Promise<PkgData>;
  getTx(txid: string): Promise<TxData>;

  lookupById(id: string): Promise<LookupResult>;
}
