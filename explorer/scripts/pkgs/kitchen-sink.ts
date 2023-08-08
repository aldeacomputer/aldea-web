/**
 * # Se madebit imperio et quantum
 *
 * ## Furtis tetenderat aventi repulso canos aras fuisses
 * 
 * Lorem markdownum tardis *ex claudere esse* addit motus non; naidas duobus viam
 * ratione Phoebus. Dolore effugere remugis, cibo in arcana Lycabas regia miserum
 * genitor **manifesta** fieres orbis pereat diro.
 * 
 * - Genus Lernae
 * - Flere quam certa venatrixque postquam ultor
 * - Tu grave properent care silet viso peraravit
 * - Ducebat auro quo nostro Atrides dare
 * - Me pro neque transit Aegides a comes
 * 
 * ## Puppes lata gaudia in Iuppiter spicis peto
 * 
 * Est fidem, et omnia, ante quae dempto cum petisti artes referentem et deusque
 * lacrimasque ignem. Ego et carere vires [procellae
 * bacchae](http://caeleste.io/dixerat-erat.html): fores fata undis, Achillea
 * Atlantiades pelle. Nam dextrae partu quadrupedes magis arserunt *generat sed*
 * volucrum principio diesque verti. Concipit in fratris bucina feroces videtur
 * leviore quas sic voluntas et tamen bracchia **excussum** vergit rivi; est
 * salutis. Metu erat dedignata, *socios miserisque hunc* tactumque, rector
 * parentum scitusque **et dumque** Aeacidae inposita Pindo quae *ipse*; in.
 * 
 * > Pretium Iole, hoc saxo oravit poterat calamo gravis icto longe metu una! Abit
 * > Elymumque Telethusa [viri Dianae](http://www.onus-dura.com/), huic quas
 * > conquesti aesculeae in quod antiqui terreat altior, opus. Et plus omnipotens
 * > dicta **hostia deusque**, plumis, colorum pervia ministri et dixi! Satis
 * > Athenas est novos honores moras, ante cum labant indue pulsant titulos
 * > postquam sacer carmine. Optima seu putes minor pectora, tardata *hostilique*
 * > pone; quis avos lampadibus conatur finem hic surgere questa.
 * 
 * ## Subito quod coniunx indignos commentaque verba
 * 
 * De tribuam vocem. Marisque erat.
 * 
 * ## Supplex deus terga ligno Arcas clarus stratis
 * 
 * Sinit mihi esse prohibet, tempore vernos, illa meque recondita collo? Tempore
 * haec. Artifices hospitis est, populusque primo arripit oculosque monedula Circe.
 * 
 * ## Mens Meleagros inter dextra siquis
 * 
 * Miles nec numina interea vestigia fiat vale, Atlantiades denique nondum; visa
 * dumque audit. Et cumulumque **forent mensas Phrygiae** in regis et iungat mihi
 * neque. Nec non spatium delapsa tamen Aesoniden optetis interceperit remis
 * remotos imbres, et Iovis, concedite. Vinclisque vocem.
 * 
 * ```
 * array += webComponentAnimated.spooling.terabyte(youtube_buffer_internic /
 *         keywords_cloud_and, 1);
 * if (driverPdfScreenshot.gibibyte_router_rpm(5 + saas_windows) !=
 *         css_art_path(97, multimedia_string_golden, 52)) {
 *     cleanPiconet += websiteSignatureWpa(dnsWaisClock + image);
 * }
 * var balance_cad = errorSessionRoot(smtp_dock_mbps, direct);
 * ```
 * 
 * Spernit data: tenentis fatiferum catulus quam, domos, et fuga cuspide vulnera
 * qui si quos? Sed est ripae adessent: tanta erat possent, visa. Arcus resolvit
 * confessa sed membris male te dixerat vestes regia coniecit cornibus Alemone
 * tamen. Mihi semper, est ab coloribus quid. Contento retexi, pedem puto vimque: o
 * marmora variusque **o** vertatur poterat.
 * @package
 */

/**
 * The kitchen sink is a class that has a field of every data type. Nice for testing.
 */
export class KitchenSink extends Jig {
  b1: bool;
  b2: bool;
  i1: i8;
  i2: i16;
  i3: i32;
  i4: i64;
  u1: u8;
  u2: u16;
  u3: u32;
  u4: u64;
  f1: f32;
  f2: f64;
  str: string;
  arr: string[];
  deepArr: string[][];
  sa: StaticArray<string>;
  deepSa: StaticArray<string[]>;
  set: Set<string>;
  deepSet: Set<string[]>;
  map: Map<string, string>;
  deepMap: Map<string, string[]>;
  ab: ArrayBuffer;
  ia1: Int8Array;
  ia2: Int16Array;
  ia3: Int32Array;
  ia4: Int64Array;
  ua1: Uint8Array;
  ua2: Uint16Array;
  ua3: Uint32Array;
  ua4: Uint64Array;
  fa1: Float32Array;
  fa2: Float64Array;
  obj: SomeObj;

  /**
   * Pass a coin to the constructor so it will be referenced.
   */
  constructor(public coin: Coin) {
    super()
    const str = 'Hello world! 😛'
    const arr = ['foo', 'bar', 'baz']

    this.b1 = true
    this.b2 = false
    this.i1 = -100
    this.i2 = -30000
    this.i3 = -2000000000
    this.i4 = -9000000000000000000
    this.u1 = 255
    this.u2 = 65000
    this.u3 = 4000000000
    this.u4 = 9000000000000000000
    this.f1 = 123.123123
    this.f2 = -123123.987654321
    this.str = str
    this.arr = arr
    this.deepArr = [arr, arr, arr]
    this.sa = StaticArray.fromArray(arr)
    this.deepSa = StaticArray.fromArray([arr, arr, arr])
    this.set = new Set<string>()
    this.deepSet = new Set<string[]>()
    this.map = new Map<string, string>()
    this.deepMap = new Map<string, string[]>()
    this.ab = new ArrayBuffer(32)
    this.ia1 = new Int8Array(4)
    this.ia2 = new Int16Array(4)
    this.ia3 = new Int32Array(4)
    this.ia4 = new Int64Array(4)
    this.ua1 = new Uint8Array(4)
    this.ua2 = new Uint16Array(4)
    this.ua3 = new Uint32Array(4)
    this.ua4 = new Uint64Array(4)
    this.fa1 = new Float32Array(4)
    this.fa2 = new Float64Array(4)
    this.obj = { foo: 'abcdefg', bar: 'xyz123abc', baz: true }
    
    for (let i = 0; i < 4; i++) {
      this.ia1[i] = (i+1) * 100
      this.ia2[i] = (i+1) * 100
      this.ia3[i] = (i+1) * 100
      this.ia4[i] = (i+1) * 100
      this.ua1[i] = (i+1) * 100
      this.ua2[i] = (i+1) * 100
      this.ua3[i] = (i+1) * 100
      this.ua4[i] = (i+1) * 100
      this.fa1[i] = (<f32>i+1) * 127.543
      this.fa2[i] = (<f64>i+1) * 127.543
    }

    this.set.add(str)
    this.deepSet.add(arr)
    this.map.set('test1', str)
    this.deepMap.set('test2', arr)
  }
}

/**
 * `SomeObj` is a plain object.
 */
declare class SomeObj {
  foo: string;
  bar: string;
  baz: bool;
}

/**
 * Just some interface for testing purposes.
 */
export interface SomeInt {
  /** `a` is a string. Long and stringy. */
  a: string;
  /** `b` is a big ol `u64` integer. Can be a pretty large number TBF. */
  b: u64;

  /**
   * The `perform()` method is where or the magic happens. Should return a map
   * with some stuff in it.
   */
  perform(): Map<string, u64>;
}

/**
 * This is a damn nice function. Calling it with the correct arguments will
 * literraly return some magic.
 * 
 * ## Parameters
 * 
 * - `int` - any old class implementing `SomeInt`
 * 
 * ## Examples
 * 
 * ```
 * class Foo implements SomeInt {
 *   constructor(
 *     public a: string;
 *     public b: u64;
 *   ) {}
 * 
 *   perform(): Map<string, u64> {
 *     return new Map([[this.a, this.b]])
 *   }
 * }
 * ```
 */
export function magicFunc(int: SomeInt): Map<string, u64> {
  return int.perform()
}