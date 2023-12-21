import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Aldea, KeyPair } from '@aldea/sdk'

// time to wait to ensure mocknet is started
const WAIT_TIME = 2000

const __dirname = dirname(fileURLToPath(import.meta.url))

const aldea = new Aldea('http://localhost:4000', { cache: false })
const keys = KeyPair.fromRandom()
const user = KeyPair.fromRandom()

setTimeout(async () => {
  try {
    console.log('start', new Date())
    const tx1 = await deployPkgs()
    console.log('tx1', new Date())
    const tx2 = await seedUser(tx1.packages[0].id)
    console.log('tx2', new Date())
    const tx3 = await kitchenSink(tx1.packages[1].id)
    console.log('tx3', new Date())

    console.log('🌱', 'address', keys.pubKey.toAddress().toString())
    console.log('🌱', 'address', user.pubKey.toAddress().toString())
    for (let jig of tx2.outputs) {
      console.log('🌱', 'jig', jig.id)  
    }
    for (let jig of tx3.outputs) {
      console.log('🌱', 'jig', jig.id)  
    }
    console.log('🌱', 'package', tx1.packages[0].id)
    console.log('🌱', 'package', tx1.packages[1].id)
    console.log('🌱', 'transaction', tx1.id)
    console.log('🌱', 'transaction', tx2.id)
    console.log('🌱', 'transaction', tx3.id)
    //process.exit()
  } catch(e) {
    console.log(await e.response.text())
    process.exit()
  }
}, WAIT_TIME)

async function deployPkgs() {
  const params = { address: keys.pubKey.toAddress().toString(), amount: 100 }
  const coin = await aldea.api.post('mint', { json: params }).json()

  const pkg1 = new Map([
    ['main.ts', readFileSync(join(__dirname, 'pkgs', 'game.ts'), 'utf8')]
  ])

  const pkg2 = new Map([
    ['main.ts', readFileSync(join(__dirname, 'pkgs', 'kitchen-sink.ts'), 'utf8')]
  ])

  const tx = await aldea.createTx(txb => {
    const feeRef = txb.load(coin.id)
    txb.deploy(pkg1)
    txb.deploy(pkg2)
    txb.fund(feeRef)
    txb.sign(keys.privKey)
  })

  return aldea.commitTx(tx).catch(catcher)
}

async function seedUser(pkgId) {
  const params = { address: keys.pubKey.toAddress().toString(), amount: 200000100 }
  const coin = await aldea.api.post('mint', { json: params }).json()

  const tx = await aldea.createTx((txb, ref) => {
    const feeRef = txb.load(coin.id)
    const pkgRef = txb.import(pkgId)

    for (let i = 0; i < 10; i++) {
      const motos = Math.floor(Math.random() * (100000 - 90000 + 1) + 90000)
      const coinRef = txb.call(feeRef, 'send', [BigInt(motos)])
      txb.lock(coinRef, user.pubKey.toAddress())
    }
    
    const stakeRef = txb.call(feeRef, 'send', [100000000n])
    txb.lock(stakeRef, keys.pubKey.toAddress())
    const houseRef = txb.new(pkgRef, 'House', [stakeRef, keys.pubKey.toBytes()])
    txb.call(houseRef, 'createGame', [0, ref(2)])

    txb.fund(feeRef)
    txb.sign(keys.privKey)
    txb.sign(user.privKey)
  })

  return aldea.commitTx(tx)
}

async function kitchenSink(pkgId) {
  console.log({ pkgId })
  const params = { address: keys.pubKey.toAddress().toString(), amount: 100 }
  const coin = await aldea.api.post('mint', { json: params }).json()

  const tx = await aldea.createTx(txb => {
    const pkgRef = txb.import(pkgId)
    const feeRef = txb.load(coin.id)
    const jigRef = txb.new(pkgRef, 'KitchenSink', [feeRef])
    txb.lock(jigRef, user.pubKey.toAddress())
    txb.fund(feeRef)
    txb.sign(keys.privKey)
  })

  return aldea.commitTx(tx).catch(catcher)
}

const catcher = async (e) => {
  console.log(await e.response.json())
  throw 'X'
}