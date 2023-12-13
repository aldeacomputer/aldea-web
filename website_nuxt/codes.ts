export const typescript = `
/**
 * Say hello to the Aldea Computer 👋
 */
export function helloWorld(name: string): string {
  return ${'`Hello ${name}`'}
}
`.trim()

export const objects = `
export interface Animal {
  feed(): void
}

export class Pet extends Jig implements Animal {
  name: string;
  size: u32 = 0;

  constructor(name: string) {
    super()
    this.name = name
  }

  feed(): void {
    this.size += 1
  }
}

export class Cat extends Pet {
  speed: u32 = 0;

  feed(): void {
    super.feed()
    this.speed += 1
  }
}
`.trim()

export const interopability = `
import { GameItem } from 'pkg://e400ce56df8d0d0b156ca4493e5243597424abdb226ff4ce4e5fcdcb8af9501c'
import { SellOffer } from 'pkg://4acf0fadb88c9166fcc7e3b64a0e6958da121e1faec101d6d0680936fcbfe792'

export class Player extends Jig {
  bag: GameItem[];

  equip(item: Item): void {
    this.bag.push(item)
  }

  sellItem(idx: u32; amount: u64): SellOffer {
    const item = this.bag.splice(idx, 1)
    return new SellOffer(item, price, this.$lock.data)
  }
}
`.trim()

export const source = `
> curl https://node.aldea.computer/package/9994f116c8d76d893e3d13b045c118cea1871c56ae45d1811a1ce064104ee8fc/source

export class PublicCounter extends Jig {
  count: u32 = 0

  constructor() {
    super()
    this.$lock.changeToPublic()
  }

  inc (): void { this.count +=1 }
}
`.trim()

export const ownership = `
export class Token extends Jig {
  sendTo(addr: ArrayBuffer): void {
    this.$lock.changeToAddressLock(addr)
  }

  destroy(): void {
    this.$lock.freeze()
  }
}

export class TokenAccount extends Jig {
  tokens: Token[] = [];

  deposit(token: Token): void {
    token.$lock.changeToJigLock()
    this.tokens.push(token)
  }
}
`.trim()

export const ecosystem = `
> aldea wallet.init -f

Creating new wallet...

  ✔ Generated new keys
  ✔ Single-key wallet created

✨  Done in 0.40s.
`.trim()

