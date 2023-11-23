import { abi } from '@aldea/sdk'

export type LookupResult =
  { type: 'jig', data: JigData } |
  { type: 'pkg', data: PkgData } |
  { type: 'tx', data: TxData }

export interface ChainAdapter {
  getBlocks(opts: any): Promise<BlockData[]>;
  getBlock(id: string): Promise<BlockData>;
  getAddrJigs(addr: string): Promise<JigData[]>;
  getJig(jigId: string): Promise<JigData>;
  getAbi(pkgId: string): Promise<abi.Abi>;
  getDocs(pkgId: string): Promise<PkgDocs>;
  getPkg(pkgId: string): Promise<PkgData>;
  getTxs(opts: any): Promise<TxDataMin[]>;
  getTx(txid: string): Promise<TxData>;

  lookupById(id: string): Promise<LookupResult>;
}
