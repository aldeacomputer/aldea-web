import ky from 'ky'
import { Abi } from '@aldea/core/abi'
import { Address, Lock, LockType, Output, OutputResponse, PackageResponse, base16 } from '@aldea/sdk'
import { ChainAdapter, LookupResult } from './adapter'
import { cached } from './cache'
import { bus } from '../../bus'

export interface PaginationParams {
  after: string;
  before: string;
  limit: number;
}

export class Backend implements ChainAdapter {
  ky: typeof ky;
  $stream?: EventSource;

  constructor(public baseUrl: string) {
    this.ky = ky.create({ prefixUrl: this.baseUrl })
  }

  async getBlocks(opts: Partial<PaginationParams> = {}): Promise<DataOf<BlockData>> {
    return this.ky.get('blocks', { searchParams: opts }).json<DataOf<BlockJson>>()
  }

  async getBlock(id: string | number): Promise<BlockData> {
    const path = typeof id === 'number' ? `blocks/h/${id}` : `blocks/${id}`
    return this.ky.get(path).json<BlockJson>()
  }

  async getBlockTxs(id: string | number, opts: Partial<PaginationParams> = {}): Promise<DataOf<TxDataMin>> {
    const path = typeof id === 'number' ? `blocks/h/${id}/transactions` : `blocks/${id}/transactions`
    return this.ky.get(path, { searchParams: opts }).json<DataOf<TxDataMin>>()
  }

  async getAddrJigs(addr: string, opts: Partial<PaginationParams> = {}): Promise<DataOf<JigData>> {
    const lock = new Lock(LockType.ADDRESS, Address.fromString(addr).hash)
    const lockHex = base16.encode(lock.toBytes())
    const res = await this.ky.get(`locks/${lockHex}/outputs`, { searchParams: opts }).json<DataOf<OutputJson>>()
    const data = await Promise.all(res.data.map(o => this.outputToJig(o)))
    return { data, meta: res.meta }
  }

  async getJig(jigId: string): Promise<JigData> {
    let res: OutputJson
    if (/_\d+$/.test(jigId)) {
      res = await this.ky.get(`outputs/o/${jigId}`).json<OutputJson>()
    } else {
      res = await cached<OutputJson>(jigId, () => this.ky.get(`outputs/${jigId}`).json<OutputJson>())
    }
    return this.outputToJig(res)
  }

  async getAbi(pkgId: string): Promise<Abi> {
    return cached<Abi>([pkgId, 'abi'], () => this.ky.get(`packages/${pkgId}/abi`).json<Abi>())
  }

  async getDocs(pkgId: string): Promise<PkgDocs> {
    return cached<PkgDocs>([pkgId, 'docs'], () => this.ky.get(`packages/${pkgId}/docs`).json<PkgDocs>())
  }

  async getPkg(pkgId: string): Promise<PkgData> {
    return cached<PkgData>(pkgId, async () => {
      const [abi, pkg] = await Promise.all([
        this.getAbi(pkgId),
        this.ky.get(`packages/${pkgId}/src`).json<PackageResponse>(),
      ])
      return { ...pkg, abi }
    })
  }

  async getTxs(opts: Partial<PaginationParams> = {}): Promise<DataOf<TxDataMin>> {
    return this.ky.get('transactions', { searchParams: opts }).json<DataOf<TxDataMin>>()
  }

  async getTx(txid: string): Promise<TxData> {
    return cached<TxData>(txid, async () => {
      return this.ky.get(`transactions/${txid}`).json<TxData>()
    })
  }

  async lookupById(_id: string): Promise<LookupResult> {
    return {}
  }

  startStream(): void {
    this.$stream = new EventSource(`${this.baseUrl}/sse?topics=blocks,transactions,stats`)
    for (let event of ['block', 'tx', 'stats']) {
      this.$stream.addEventListener(event, e => {
        bus.emit(e.type, JSON.parse(e.data))
      })
    }
  }

  stopStream(): void {
    this.$stream?.close()
  }

  private async outputToJig(o: OutputJson): Promise<JigData> {
    const pkgId = o.class.replace(/_\d+$/, '')
    const abi = await this.getAbi(pkgId)
    const o2: OutputResponse = {
      ...o,
      lock: Lock.fromBytes(base16.decode(o.lock)).toJson()
    }
    const props = Output.fromJson(o2, abi).props!
    return { ...o2, abi, props }
  }
}

interface BlockJson {
  id: string;
  height: number;
  prev_block_id: string;
  creator: string;
  created_at: number;
  tx_root: string;
  state_root: string;
  state_commit: string;
  sig: string;
}

interface OutputJson {
  id: string;
  origin: string;
  location: string;
  class: string;
  lock: string;
  state: string;
}
