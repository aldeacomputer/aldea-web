import { Aldea, Address, FileResponse, OutputResponse, PackageResponse, Lock, LockType, Output, CommitTxResponse, BufReader, BCS, abi, blake3, base16 } from '@aldea/sdk'
import { ChainAdapter, LookupResult } from './adapter'
import { cached } from './cache'

export class Mocknet implements ChainAdapter {
  constructor(public aldea: Aldea) {}

  async getAddrJigs(address: string): Promise<JigData[]> {
    const addr = Address.fromString(address)
    const lock = new Lock(LockType.ADDRESS, addr.hash)
    const url = `outputs-by-lock/${base16.encode(lock.toBytes())}`
    const outputs: OutputResponse[] = await this.aldea.api.get(url, { cache: 'no-cache' }).json()
    return Promise.all(outputs.map(o => this.outputToJig(o)))
  }

  async getBlock(heightOrId: string): Promise<[BlockData, TxData[]]> {
    const url = /^([a-f0-9]{2}){32}$/ ? `block/${heightOrId}` : `block-by-height/${heightOrId}`
    const blob = await this.aldea.api.get(url).blob()
    const buf = await blob.arrayBuffer()
    const block = new BlockStreamParser(buf)
    // @ts-ignore
    return [block.header, block.txds]
  }

  async getHeader(id: string): Promise<BlockData> {
    return cached<BlockData>(['header'], () => this.aldea.api.get(`header/${id}`).json())
  }

  async getBlocks(opts: { limit?: number } = {}): Promise<BlockData[]> {
    const limit = opts.limit || 50
    return this.aldea.api.get('headers', { searchParams: { size: limit }, cache: 'no-cache' }).json()
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
      this.getHeader(id),
    ])

    if (isJigData(data))      return { type: 'jig', data }
    else if (isPkgData(data)) return { type: 'pkg', data }
    else if (isTxData(data))  return { type: 'tx', data }
    else if (isBlockData(data))  return { type: 'block', data }
    
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

function isJigData(data: JigData | PkgData | TxData | BlockData): data is JigData {
  return 'origin' in data && 'location' in data
}

function isPkgData(data: JigData | PkgData | TxData | BlockData): data is PkgData {
  return 'entries' in data && 'files' in data
}

function isTxData(data: JigData | PkgData | TxData | BlockData): data is TxData {
  return 'outputs' in data && 'packages' in data
}

function isBlockData(data: JigData | PkgData | TxData | BlockData): data is BlockData {
  return 'height' in data && 'prev_block_id' in data
}

class BlockStreamParser {
  reader: BufReader;
  header!: BlockData;
  _txs: BlockTxData[] = [];
  _outs = new Map<string, OutputResponse>()
  _pkgs = new Map<string, PackageResponse>()

  constructor(buf: ArrayBuffer) {
    this.reader = new BufReader(new Uint8Array(buf))
    while (this.reader.remaining > 0) {
      this.read()
    }
  }

  get txds(): TxData[] {
    return this._txs.map(t => {
      return {
        ...t,
        outputs: t.outputs.map(id => this._outs.get(id)!),
        packages: t.packages.map(id => this._pkgs.get(id)!),
        origins: undefined,
      }
    })
  }

  read(): void {
    const type = this.reader.readU8()
    const lb = this.reader.readFixedBytes(3)
    const len = lb[0] | (lb[1] << 8) | (lb[2] << 16)
    const data = this.reader.readFixedBytes(len)

    switch(type) {
      case 0xA0: return this.parseBlock(data)
      case 0xB0: return this.parseOutput(data)
      case 0xC0: return this.parseTx(data)
      case 0xC1: return this.parsePackage(data)
    }
  }

  private parseBlock(data: Uint8Array): void {
    const r = new BufReader(data)
    this.header = {
      id: base16.encode(blake3.hash(data)),
      height: Number(r.readU64()),
      prev_block_id: base16.encode(r.readFixedBytes(32)),
      creator: base16.encode(r.readFixedBytes(32)),
      created_at: Number(r.readU64()),
      tx_root: base16.encode(r.readFixedBytes(32)),
      state_root: base16.encode(r.readFixedBytes(32)),
      state_commit: base16.encode(r.readFixedBytes(32)),
      sig: base16.encode(r.readFixedBytes(64)),
    }
  }

  private parseOutput(data: Uint8Array): void {
    const output = Output.fromBytes(data)
    this._outs.set(output.id, output.toJson(),)
  }

  private parseTx(data: Uint8Array): void {
    const r = new BufReader(data)
    const rawtx = r.readBytes()
    this._txs.push({
      id: base16.encode(blake3.hash(rawtx)),
      rawtx: base16.encode(rawtx),
      reads: r.readSeq(r => base16.encode(r.readFixedBytes(32))),
      spends: r.readSeq(r => base16.encode(r.readFixedBytes(32))),
      outputs: r.readSeq(r => base16.encode(r.readFixedBytes(32))),
      packages: r.readSeq(r => base16.encode(r.readFixedBytes(32))),
      origins: r.readSeq(r => base16.encode(r.readFixedBytes(34))),
    })
  }

  private parsePackage(data: Uint8Array): void {
    const r = new BufReader(data)
    const pkg = r.readBytes()
    const id = base16.encode(blake3.hash(pkg))
    const [entries, bundle] = BCS.pkg.decode(pkg)
    this._pkgs.set(id, {
      id,
      entries,
      files: [...bundle].map(([name, content]) => ({ name, content })),
    })
  }
}

interface BlockTxData {
  id: string;
  rawtx: string;
  reads: string[];
  spends: string[];
  outputs: string[];
  packages: string[];
  origins: string[];
}