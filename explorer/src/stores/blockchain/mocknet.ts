import { Abi } from '@aldea/core/abi'
import { Aldea, FileResponse, OutputResponse, Output } from '@aldea/sdk'
import { ChainAdapter, LookupResult } from './adapter';
import { cached } from './cache';

export class Mocknet implements ChainAdapter {
  constructor(public aldea: Aldea) {}

  async getAddrJigs(addr: string): Promise<JigData[]> {
    const outputs: OutputResponse[] = await this.aldea.api.get(`utxos-by-address/${addr}`, { cache: 'no-cache' }).json()
    return Promise.all(outputs.map(o => this.outputToJig(o)))
  }

  async getJig(jigId: string): Promise<JigData> {
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

  getPkgSrc(pkgId: string): Promise<PkgData> {
    return cached<PkgData>(['pkg', pkgId], async () => {
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

  async getTx(txid: string): Promise<TxData> {
    return cached<TxData>(['tx', txid], () => this.aldea.getTx(txid))
  }

  async lookupById(id: string): Promise<LookupResult> {
    const lookups = [
      this.getJig(id),
      this.getPkgSrc(id),
      this.getTx(id)
    ]

    const data = await Promise.any(lookups)

    if (isJigData(data))      return { type: 'jig', data }
    else if (isPkgData(data)) return { type: 'pkg', data }
    else if (isTxData(data))  return { type: 'tx', data }
    
    throw new Error('unrecognised type')
  }

  private async outputToJig(o: OutputResponse): Promise<JigData> {
    const abi = await this.getPkgAbi(o.class.replace(/_\d+$/, ''))
    const props = Output.fromJson(o, abi).props!
    return { ...o, abi, props }
  }
}

function isJigData(data: JigData | PkgData | TxData): data is JigData {
  return 'origin' in data && 'location' in data
}

function isPkgData(data: JigData | PkgData | TxData): data is PkgData {
  return 'entries' in data && 'files' in data
}

function isTxData(data: JigData | PkgData | TxData): data is TxData {
  return 'outputs' in data && 'packages' in data
}