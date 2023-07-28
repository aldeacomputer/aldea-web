import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Aldea, KeyPair } from '@aldea/sdk'

// time to wait to ensure mocknet is started
const WAIT_TIME = 2000

const __dirname = dirname(fileURLToPath(import.meta.url))

const aldea = new Aldea('http://localhost:4000')
const keys = KeyPair.fromRandom()
const user = KeyPair.fromRandom()

setTimeout(async () => {
  const tx1 = await deployPkg()
  const tx2 = await seedUser(tx1.packages[0].id)

  console.log('🌱', 'address', keys.pubKey.toAddress().toString())
  console.log('🌱', 'address', user.pubKey.toAddress().toString())
  for (let jig of tx2.outputs) {
    console.log('🌱', 'jig', jig.id)  
  }
  console.log('🌱', 'package', tx1.packages[0].id)
  console.log('🌱', 'transaction', tx1.id)
  console.log('🌱', 'transaction', tx2.id)
}, WAIT_TIME)

async function deployPkg() {
  const params = { address: keys.pubKey.toAddress().toString(), amount: 100 }
  const coin = await aldea.api.post('mint', { json: params }).json()

  const pkg = new Map([
    ['main.ts', readFileSync(join(__dirname, 'pkgs', 'game.ts'), 'utf8')]
  ])

  const tx = await aldea.createTx(txb => {
    const feeRef = txb.load(coin.id)
    txb.deploy(pkg)
    txb.fund(feeRef)
    txb.sign(keys.privKey)
  })

  return aldea.commitTx(tx)
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