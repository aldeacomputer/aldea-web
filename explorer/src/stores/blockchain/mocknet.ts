import type { Abi } from '@aldea/core/abi'
import { type Aldea, type CommitTxResponse, type FileResponse, type PackageResponse, type OutputResponse, Output } from '@aldea/sdk'
import type { ChainAdapter } from './adapter';
import { cached } from './cache';

export class Mocknet implements ChainAdapter {
  constructor(public aldea: Aldea) {}

  async getAddrJigs(addr: string): Promise<Jig[]> {
    const outputs: OutputResponse[] = await this.aldea.api.get(`utxos-by-address/${addr}`, { cache: 'no-cache' }).json()
    return Promise.all(outputs.map(o => this.outputToJig(o)))
  }

  async getJig(jigId: string): Promise<Jig> {
    let output: OutputResponse
    if (/_\d+$/.test(jigId)) {
      output = await this.aldea.getOutputByOrigin(jigId)
    } else {
      output = await cached<OutputResponse>(['jig', jigId], () => this.aldea.getOutput(jigId))
    }

    return this.outputToJig(output)
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

  private async outputToJig(o: OutputResponse): Promise<Jig> {
    const abi = await this.getPkgAbi(o.class.replace(/_\d+$/, ''))
    const props = Output.fromJson(o, abi).props!
    return { ...o, abi, props }
  }
}
