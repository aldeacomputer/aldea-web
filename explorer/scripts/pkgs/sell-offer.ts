/**
 * A SellOffer is a public Jig with any other Jig locked to it. The offer can be
 * redeemed by another party sending a payment coin which matches the number of
 * motos demanded by the orignator of the offer.
 */
export class SellOffer extends Jig {
  xToken: CancelToken;

  constructor(
    public asset: Jig,
    public amount: u64,
    sellerPKH: ArrayBuffer,
  ) {
    super()
    this.xToken = new CancelToken()
    this.xToken.$lock.changeToAddressLock(sellerPKH)
    this.asset.$lock.changeToJigLock()
    this.$lock.changeToPublicLock()
  }

  /**
   * The offer can be redeemed by passing a Coin containing sufficient motos.
   * The Coin is sent to the offer originator and the Jig is sent to the caller
   * of this method.
   */
  redeem(payment: Coin): void {
    if (payment.amount < this.amount) {
      throw new Error('payment does not match offer')
    }

    const sellerPKH = this.xToken.$lock.getAddressOrFail()
    const buyerPKH = payment.$lock.getAddressOrFail()
    
    payment.$lock.changeToAddressLock(sellerPKH)
    this.asset.$lock.changeToAddressLock(buyerPKH)
    //this.$lock.freeze()
  }

  /**
   * The SellOffer can be cancelled by the originator simply by calling this
   * method with a valid signature. The cancel token can only be frozen if a
   * valid signature exists.
   */
  cancel(): void {
    const sellerPKH = this.xToken.$lock.getAddressOrFail()
    this.asset.$lock.changeToAddressLock(sellerPKH)
    this.xToken.$lock.freeze()
    //this.$lock.freeze()
  }
}

export class CancelToken extends Jig {}
