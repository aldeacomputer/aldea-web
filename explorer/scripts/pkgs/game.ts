/**
 * # Under Over Seven
 * 
 * Under Over Seven is a very simple dice game. The player tries to guess
 * whether the value of two rolled dice will be lower, higher or equal to seven.
 * 
 * if the player guesses correctly that the dice will be lower or higher than
 * seven, they are paid back at 1/1 (doubling their money). If the guess
 * correctly that the dice will be equal to seven they are paid back at 4/1.
 * Otherwise, the player loses their bet.
 * 
 * This code implements Under Over Seven on the Aldea Computer, with the `House`
 * and each `Game` implemented as public Jigs (smart contracts). Randomness of
 * the dice roll is implemented in a provably fair way by the player creating a
 * game instance, requiring the house to sign the origin with a known key, and
 * using the signature as a source of entropy.
 * @package
 */

import { canLock } from 'aldea/auth'

/**
 * House is a public Jig this is used to create new Game jigs.
 * 
 * When a house is instantiated, a party deposits a coin as the House balance
 * and declares it's public key. The instantiating party retains control of the
 * House jig through a ControlToken. This allows the balance to be withdrawn or
 * added to in the future.
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

  /**
   * A public method that is called by a player to instantiate a new Game.
   * 
   * The player must add a coin as their bet and the House adds 4 times the bet
   * (representing the maximum possible winnings) to the Game as it's own stake.
   */
  createGame(guess: i8, bet: Coin): Game {
    const stake = this.balance.send(bet.amount * 4)
    stake.$lock.unlock()
    return new Game(this, guess, bet, stake)
  }

  /**
   * Deposit additional coins to the House, which are merged into the House
   * balance.
   * 
   * Only the House controller can call this method.
   */
  deposit(coins: Coin[]): void {
    if (!canLock(this.ctrl)) {
      throw new Error('unauthorized to control House jig')
    }
    this.balance = this.balance.combine(coins)
  }

  /**
   * Withdraws the given number of motos from the House balance.
   * 
   * Only the House controller can call this method.
   */
  withdraw(motos: u64): Coin {
    if (!canLock(this.ctrl)) {
      throw new Error('unauthorized to control House jig')
    }
    const coin = this.balance.send(motos)
    return coin
  }

  /**
   * Withdraws the entire balance from the House.
   * 
   * Only the House controller can call this method.
   */
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
 * Game is a public jig that represents a single play of Under Over Seven.
 * 
 * The player must create the instance of Game through calling `House.createGame()`.
 * The player's bet and the House's stake are set on the Jig.
 * 
 * At this point the player would usually pass serialized of the Game Jig to
 * the House entity, where they would sign the origin and call the `rollDice()`
 * method and pass in the signature.
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

  /**
   * Provides entropy for the PRNG which is used to calculate the dice roll.
   * 
   * The given entropy must be a valid signature of the output origin against
   * the house pubkey. Implicitly therefore, only House can call this method.
   */
  rollDice(sig: Uint8Array): void {
    // todo - ideally we should be able to verify the sig against the house pubkey
    // eg: ed25519.verify(this.$output.origin, sig, this.house.pubkey)
    // todo - instead we'll check the tx is signed by house
    // if (!canLock(this.house.ctrl)) {
    //   throw new Error('unauthorized to control Game jig')
    // }
    this.signature = sig
    const prng = new PRNG(sig)
    this.dice[0] = Math.floor(prng.rand() * 6 + 1) as u8
    this.dice[1] = Math.floor(prng.rand() * 6 + 1) as u8
    this.handleResult()
  }

  // handles the result of the game
  // if player wins having guessed under or over, they recieve 1/1 of their bet.
  // if player wins having guess seven, they receive 4/1 of their bet.
  // otherwise, the bet and stake go back to house.
  private handleResult(): void {
    const score = this.dice[0] + this.dice[1]
    const userPKH = this.ctrl.$lock.getAddressOrFail()

    if (
      (score < 7 && this.guess === Guess.UNDER) ||
      (score > 7 && this.guess === Guess.OVER)
    ) {
      const winnings = this.stake.send(this.bet.amount)
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

/**
 * ControlToken is a very simple Jig that is used to control access to methods
 * on public Jigs. If a transaction contains a signature from the key the token
 * is locked to, then access is implied.
 */
export class ControlToken extends Jig {}

enum Guess {
  UNDER = -1,
  SEVEN,
  OVER,
}

/**
 * Implementation of SFC-32 (Small Fast Counter) PRNG.
 * Passes the PractRand PRNG test suite.
 */
class PRNG {
  a: u32;
  b: u32;
  c: u32;
  d: u32;

  constructor(seed: Uint8Array) {
    if (seed.byteLength < 16) {
      throw new Error('PRNG seed must be at least 128 bits')
    }
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