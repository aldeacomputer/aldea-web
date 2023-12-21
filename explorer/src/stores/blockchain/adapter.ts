import { abi } from '@aldea/sdk'

export type LookupResult =
  { type: 'jig', data: JigData } |
  { type: 'pkg', data: PkgData } |
  { type: 'tx', data: TxData } |
  { type: 'block', data: BlockData }

export interface ChainAdapter {
  getBlocks(opts?: any): Promise<BlockData[]>;
  //getBlocks(opts: any): Promise<DataOf<BlockData>>;
  getBlock(id: string): Promise<[BlockData, TxData[]]>;
  //getBlockTxs(id: string): Promise<DataOf<TxDataMin>>;
  //getBlockTxs(id: string, opts: any): Promise<DataOf<TxDataMin>>;
  //getTxs(): Promise<DataOf<TxDataMin>>;
  //getTxs(opts: any): Promise<DataOf<TxDataMin>>;
  getTx(txid: string): Promise<TxData>;
  getJig(jigId: string): Promise<JigData>;
  getAbi(pkgId: string): Promise<abi.Abi>;
  getDocs(pkgId: string): Promise<PkgDocs>;
  getPkg(pkgId: string): Promise<PkgData>;
  getAddrJigs(addr: string): Promise<JigData[]>;
  //getAddrJigs(addr: string, opts: any): Promise<DataOf<JigData>>;

  lookupById(id: string): Promise<LookupResult>;
}
