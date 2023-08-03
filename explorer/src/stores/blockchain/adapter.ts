import { Abi } from '@aldea/core/abi'
import { CommitTxResponse, PackageResponse } from '@aldea/sdk'

export interface ChainAdapter {
  getAddrJigs(addr: string): Promise<Jig[]>;
  getJig(jigId: string): Promise<Jig>;
  getPkgAbi(pkgId: string): Promise<Abi>;
  getPkgSrc(pkgId: string): Promise<PackageResponse>;
  getTx(txid: string): Promise<CommitTxResponse>;
}
