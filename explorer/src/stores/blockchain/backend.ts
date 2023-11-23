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

  async getBlocks(opts: Partial<PaginationParams> = {}): Promise<BlockData[]> {
    const res = await this.ky.get('blocks', { searchParams: opts }).json<DataOf<BlockJson[]>>()
    return res.data
  }

  async getBlock(id: string | number): Promise<BlockData> {
    const path = typeof id === 'number' ? `/blocks/h/${id}` : `/blocks/${id}`
    const res = await this.ky.get(path).json<DataOf<BlockJson>>()
    return res.data
  }

  async getAddrJigs(addr: string): Promise<JigData[]> {
    const lock = new Lock(LockType.ADDRESS, Address.fromString(addr).hash)
    const lockHex = base16.encode(lock.toBytes())
    const res = await this.ky.get(`locks/${lockHex}/outputs`).json<DataOf<OutputJson[]>>()
    return Promise.all(res.data.map(o => this.outputToJig(o)))
  }

  async getJig(jigId: string): Promise<JigData> {
    let res: DataOf<OutputJson>
    if (/_\d+$/.test(jigId)) {
      res = await this.ky.get(`outputs/o/${jigId}`).json<DataOf<OutputJson>>()
    } else {
      res = await cached<DataOf<OutputJson>>(jigId, () => this.ky.get(`outputs/${jigId}`).json<DataOf<OutputJson>>())
    }
    return this.outputToJig(res.data)
  }

  async getAbi(pkgId: string): Promise<Abi> {
    const res = await cached<DataOf<Abi>>([pkgId, 'abi'], () => this.ky.get(`packages/${pkgId}/abi`).json<DataOf<Abi>>())
    return res.data
  }

  async getDocs(pkgId: string): Promise<PkgDocs> {
    const res = await cached<DataOf<PkgDocs>>([pkgId, 'docs'], () => this.ky.get(`packages/${pkgId}/docs`).json<DataOf<PkgDocs>>())
    return res.data
  }

  getPkg(pkgId: string): Promise<PkgData> {
    return cached<PkgData>(pkgId, async () => {
      const [abi, pkg] = await Promise.all([
        this.getAbi(pkgId),
        this.ky.get(`packages/${pkgId}/src`).json<DataOf<PackageResponse>>(),
      ])
      return { ...pkg.data, abi }
    })
  }

  async getTxs(opts: Partial<PaginationParams> = {}): Promise<TxDataMin[]> {
    const res = await this.ky.get('transactions', { searchParams: opts }).json<DataOf<TxJsonMin[]>>()
    return res.data.map(tx => ({ id: tx.id, size: tx.raw.length / 2 }))
  }

  getTx(txid: string): Promise<TxData> {
    return cached<TxData>(txid, async () => {
      const res = await this.ky.get(`transactions/${txid}`).json<DataOf<TxJson>>()
      
      return {
        id: res.data.id,
        rawtx: res.data.raw,
        inputs: [],
        outputs: [],
        packages: [],
        timestamp: 0,
      }
    })
  }

  lookupById(id: string): Promise<LookupResult> {
    
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

interface DataOf<T> {
  data: T;
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

interface TxJson {
  id: string;
  raw: string;
  block_id: string;
  inputs: string[];
  outputs: string[];
  packages: string[];
}

interface TxJsonMin {
  id: string;
  raw: string;
}
