import { canLock } from 'aldea/auth'

/**
 * TODO
 */
export class House extends Jig {
  ctrl: ControlToken;

  constructor(
    public balance: Coin,
    public pubkey: Uint8Array,
  ) {
    super()
    this.ctrl = new ControlToken()
    const housePKH = this.balance.$lock.getAddressOrFail()
    this.ctrl.$lock.changeToAddressLock(housePKH)
    this.balance.$lock.changeToJigLock()
    this.$lock.changeToPublicLock()
  }

  createGame(guess: i8, bet: Coin): Game {
    const stake = this.balance.send(bet.motos * 5)
    stake.$lock.unlock()
    return new Game(this, guess, bet, stake)
  }

  deposit(coins: Coin[]): void {
    if (!canLock(this.ctrl)) {
      throw new Error('unauthorized to control House jig')
    }
    this.balance = this.balance.combine(coins)
  }

  withdraw(motos: u64): Coin {
    if (!canLock(this.ctrl)) {
      throw new Error('unauthorized to control House jig')
    }
    const coin = this.balance.send(motos)
    return coin
  }

  close(): Coin {
    if (!canLock(this.ctrl)) {
      throw new Error('unauthorized to control House jig')
    }
    this.balance.$lock.unlock()
    this.ctrl.$lock.freeze()
    return this.balance
  }
}

/**
 * TODO
 */
export class Game extends Jig {
  ctrl: ControlToken;
  dice: StaticArray<u8> = new StaticArray(2);
  signature: Uint8Array = new Uint8Array(64);

  constructor(
    public house: House,
    public guess: i8,
    public bet: Coin,
    public stake: Coin,
  ) {
    if (!caller.is<House>(true)) {
      throw new Error('use House.createGame() to instantiate a game')
    }
    super()
    this.ctrl = new ControlToken()
    const userPKH = this.bet.$lock.getAddressOrFail()
    this.ctrl.$lock.changeToAddressLock(userPKH)
    this.bet.$lock.changeToJigLock()
    this.stake.$lock.changeToJigLock()
    this.$lock.changeToPublicLock()
  }

  rollDice(sig: Uint8Array): void {
    // todo - would be nice if we could verify the sig against the house pubkey
    // eg: ed25519.verify(this.$output.id, sig, this.house.pubkey)
    // instead we'll check the tx is signed by house
    //if (!canLock(this.house.ctrl)) {
    //  throw new Error('unauthorized to control Game jig')
    //}
    this.signature = sig
    const prng = new PRNG(sig)
    this.dice[0] = Math.floor(prng.rand() * 6 + 1) as u8
    this.dice[1] = Math.floor(prng.rand() * 6 + 1) as u8
    this.handleResult()
  }

  private handleResult(): void {
    const score = this.dice[0] + this.dice[1]
    const userPKH = this.ctrl.$lock.getAddressOrFail()

    if (
      (score < 7 && this.guess === Guess.UNDER) ||
      (score > 7 && this.guess === Guess.OVER)
    ) {
      const winnings = this.stake.send(this.bet.motos)
      this.bet = this.bet.combine([winnings])
      this.bet.$lock.changeToAddressLock(userPKH)
      this.stake.$lock.unlock()
      this.house.deposit([this.stake])
    } else if (score == 7 && this.guess === Guess.SEVEN) {
      this.stake.$lock.unlock()
      this.bet = this.bet.combine([this.stake])
      this.bet.$lock.changeToAddressLock(userPKH)
    } else {
      this.stake.$lock.unlock()
      this.bet.$lock.unlock()
      this.house.deposit([this.stake, this.bet])
    }
  }
}

export class ControlToken extends Jig {}

enum Guess {
  UNDER = -1,
  SEVEN,
  OVER,
}

/**
 * TODO
 */
class PRNG {
  a: u32;
  b: u32;
  c: u32;
  d: u32;

  constructor(seed: Uint8Array) {
    if (seed.byteLength < 16) { throw new Error('PRNG seed must be at least 128 bits') }
    const view = new DataView(seed.buffer, seed.byteOffset, seed.byteLength)
    this.a = view.getUint32(0, true)
    this.b = view.getUint32(4, true)
    this.c = view.getUint32(8, true)
    this.d = view.getUint32(12, true)
  }

  rand(): f64 {
    this.a |= 0
    this.b |= 0
    this.c |= 0
    this.d |= 0

    const t = (this.a + this.b | 0) + this.d | 0
    this.d = this.d + 1 | 0
    this.a = this.b ^ this.b >>> 9
    this.b = this.c + (this.c << 3) | 0
    this.c = this.c << 21 | this.c >>> 11
    this.c = this.c + t | 0
    return (t >>> 0) / <f64>4294967296
  }
}
