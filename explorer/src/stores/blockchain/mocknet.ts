import type { Abi } from '@aldea/core/abi'
import type { Aldea, CommitTxResponse, FileResponse, PackageResponse, OutputResponse } from '@aldea/sdk'
import type { ChainAdapter } from './adapter';
import { cached } from './cache';

export class Mocknet implements ChainAdapter {
  constructor(public aldea: Aldea) {}

  getAddrJigs(addr: string): Promise<OutputResponse[]> {
    return this.aldea.api.get(`utxos-by-address/${addr}`, { cache: 'no-cache' }).json()
  }

  getPkgAbi(pkgId: string): Promise<Abi> {
    return cached<Abi>(['abi', pkgId], () => this.aldea.getPackageAbi(pkgId))
  }

  getPkgSrc(pkgId: string): Promise<PackageResponse> {
    return cached<PackageResponse>(['pkg', pkgId], async () => {
      const res = await this.aldea.getPackageSrc(pkgId)
      if (res.files instanceof Map) {
        res.files = [...(res.files as Map<string, string>)].reduce((list, [name, content]) => {
          list.push({ name, content })
          return list
        }, [] as FileResponse[])
      }
      return res
    })
  }

  async getTx(txid: string): Promise<CommitTxResponse> {
    return cached<CommitTxResponse>(['tx', txid], () => this.aldea.getTx(txid))
  }
}
