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

declare class SomeObj {
  foo: string;
  bar: string;
  baz: bool;
}