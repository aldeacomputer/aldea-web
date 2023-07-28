import { Abi } from '@aldea/core/abi'
import { CommitTxResponse, PackageResponse, OutputResponse } from '@aldea/sdk'

export interface ChainAdapter {
  getAddrJigs(addr: string): Promise<Array<OutputResponse>>;
  getPkgAbi(pkgId: string): Promise<Abi>;
  getPkgSrc(pkgId: string): Promise<PackageResponse>;
  getTx(txid: string): Promise<CommitTxResponse>;
}
