import { Aldea, FileResponse, OutputResponse, Output, CommitTxResponse, abi } from '@aldea/sdk'
import { ChainAdapter, LookupResult } from './adapter'
import { cached } from './cache'

export class Mocknet implements ChainAdapter {
  constructor(public aldea: Aldea) {}

  async getAddrJigs(addr: string): Promise<JigData[]> {
    const outputs: OutputResponse[] = await this.aldea.api.get(`utxos-by-address/${addr}`, { cache: 'no-cache' }).json()
    return Promise.all(outputs.map(o => this.outputToJig(o)))
  }

  async getBlock(_id: string): Promise<BlockData> {
    
  }

  async getBlocks(): Promise<BlockData[]> {
    return Promise.resolve([])
  }

  async getJig(jigId: string): Promise<JigData> {
    let output: OutputResponse
    if (/_\d+$/.test(jigId)) {
      output = await this.aldea.getOutputByOrigin(jigId)
    } else {
      output = await cached<OutputResponse>(jigId, () => this.aldea.getOutput(jigId))
    }

    return this.outputToJig(output)
  }

  async getAbi(pkgId: string): Promise<abi.Abi> {
    return cached<abi.Abi>([pkgId, 'abi'], () => this.aldea.getPackageAbi(pkgId))
  }

  async getDocs(pkgId: string): Promise<PkgDocs> {
    return cached<PkgDocs>([pkgId, 'docs'], () => this.aldea.api.get(`package/${pkgId}/docs`).json())
  }

  async getPkg(pkgId: string): Promise<PkgData> {
    return cached<PkgData>(pkgId, async () => {
      const [abi, pkg] = await Promise.all([
        this.getAbi(pkgId),
        this.aldea.getPackageSrc(pkgId),
      ])

      if (pkg.files instanceof Map) {
        pkg.files = [...(pkg.files as Map<string, string>)].reduce((list, [name, content]) => {
          list.push({ name, content })
          return list
        }, [] as FileResponse[])
      }

      return { ...pkg, abi }
    })
  }

  async getTx(txid: string): Promise<TxData> {
    return cached<TxData>(txid, async () => {
      const data = await this.aldea.getTx(txid) as CommitTxResponse
      return { ...data } as TxData
    })
  }

  async lookupById(id: string): Promise<LookupResult> {
    const data = await Promise.any([
      this.getJig(id),
      this.getPkg(id),
      this.getTx(id),
    ])

    if (isJigData(data))      return { type: 'jig', data }
    else if (isPkgData(data)) return { type: 'pkg', data }
    else if (isTxData(data))  return { type: 'tx', data }
    
    throw new Error('unrecognised type')
  }

  private async outputToJig(o: OutputResponse): Promise<JigData> {
    const pkgId = o.class.replace(/_\d+$/, '')
    const abi = await this.getAbi(pkgId)
    const props = Output.fromJson(o, abi).props!
    return { ...o, abi, props }
  }
}

export function createMocknetAdapter(url: string): Mocknet {
  const aldea = new Aldea(url)
  return new Mocknet(aldea)
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