import { codeToTokens } from '../lib/shiki'

export const navLinks = [
  { text: 'Developer docs', icon: 'book', url: 'https://docs.aldea.computer' },
  { text: 'Tutorial', icon: 'rocket', url: 'https://docs.aldea.computer/tutorial/basics/introduction' },
  { text: 'Explorer', icon: 'compass', url: 'https://explorer.aldea.computer' },
]

export const sections = [
  { name: 'Usability & programmability', id: 'usability' },
  { name: 'Scale & performance', id: 'scale' },
  { name: 'Interactive objects', id: 'objects' },
  { name: 'Learn more', id: 'contact' },
  { name: 'About us', id: 'about' },
]

const code1 = `
/**
 * Say hello to the Aldea Computer 👋
 */
export function helloWorld(name: string): string {
  return ${'`Hello ${name}`'}
}
`.trim()

const code2 = `
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

// 4acf0fadb88c9166fcc7e3b64a0e6958da121e1faec101d6d0680936fcbfe792
// https://node.aldea.computer/packages/0000000000000000000000000000000000000000000000000000000000000000/source

const code3 = `
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

const code4 = `
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

const code5 = `
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

const code6 = `
> aldea wallet.init -f

Creating new wallet...

  ✔ Generated new keys
  ✔ Single-key wallet created

✨  Done in 0.40s.
`.trim()

export const devExamples = [
  {
    title: "It's just TypeScript",
    description: 'Boost your productivity using a familiar and comfortable language.',
    tokens: codeToTokens(code1, 'typescript')
  }, {
    title: 'Object-oriented',
    description: 'Get going faster with our simple yet powerful programming model that just makes sense.',
    tokens: codeToTokens(code2, 'typescript')
  }, {
    title: 'Interopability and composability',
    description: 'Create new network effects with a world of objects interacting seamlessly.',
    tokens: codeToTokens(code3, 'typescript')
  }, {
    title: 'View source code',
    description: "Learn from and build on top of others' creations. Web1's killer feature comes to Web3!",
    tokens: codeToTokens(code4, 'text')
  }, {
    title: 'First class ownership model',
    description: 'Power up your smart contracts with our beautifully simple ownership model.',
    tokens: codeToTokens(code5, 'typescript')
  }, {
    title: 'Ecosystem of tools',
    description: 'Unlock your potential with our dev tools, APIs, browser wallet and explorer.',
    tokens: codeToTokens(code6, 'text')
  },
]

export const codeExamples = [
  {
    name: 'typescript',
    code: code1,
    lang: 'typescript',
  }, {
    name: 'objects',
    code: code2,
    lang: 'typescript',
  }, {
    name: 'interopability',
    code: code3,
    lang: 'typescript',
  }, {
    name: 'source',
    code: code4,
    lang: 'text',
  }, {
    name: 'ownership',
    code: code5,
    lang: 'typescript',
  }, {
    name: 'ecosystem',
    code: code6,
    lang: 'text',
  },
]

export const performanceData = [
  { name: 'Ethereum', tps: '30', vs: '0.00003' },
  { name: 'Solana', tps: '65,000', vs: '0.065' },
  { name: 'Aptos', tps: '160,000', vs: '0.16' },
  { name: 'Sui', tps: '160,000', vs: '0.16' },
]

export const performanceFeatures = [
  {
    image: '/images/performance-parallelization.png',
    title: 'Object-level parallelization',
    description: 'Aldea’s object model unlocks a greater level of parallelization. If two transactions operate over different objects they can be executed in parallel.',
  }, {
    image: '/images/performance-speed.png',
    title: 'Near-native execution speeds',
    description: 'Smart contract logic gets compiled to Web Assembly, a battle-tested execution environment that runs at near-native speeds.',
  }, {
    image: '/images/performance-caching.png',
    title: 'State caching',
    description: 'All state within Aldea is localized and stored as objects and packages. This enables excellent cache locality and minimal database lookups.',
  }, {
    image: '/images/performance-validation.png',
    title: 'Specialized signature validation',
    description: 'Validating signatures is the most demanding part of running a node. Aldea’s architecture enables this piece to be optimized and run separately from execution.',
  }, {
    image: '/images/performance-storage.png',
    title: 'Low storage usage',
    description: 'A node does not need the entire blockchain state to begin validating. Aldea’s database also performs batch updates to supporting objects to be used at very high frequencies.',
  }
]

export const usecases = [
  {
    image: '/images/use-gaming.png',
    title: 'Gaming',
    description: 'The metaverse, interopable cross-game items, real-time gaming.',
  }, {
    image: '/images/use-nfts.png',
    title: 'Next generation NFTs',
    description: 'Tickets, access tokens, feature-rich interactive assets',
  }, {
    image: '/images/use-apis.png',
    title: 'Decentralized back-ends',
    description: 'Trustless APIs, distributed apps, open data protocols',
  }, {
    image: '/images/use-betting.png',
    title: 'Sports betting',
    description: 'Fantasy sports gaming, decentralized leaderboards',
  }, {
    image: '/images/use-finance.png',
    title: 'Finance',
    description: 'Decentralized exchanges, high frequency trading, payments',
  },
]

export const betterUsecases = [
  {
    id: 'gaming',
    title: 'Gaming',
    text: 'Where the boundaries of technology are pushed.',
    list: [
      {
        icon: '/images/uc-cheap.png',
        title: 'Cheap transactions',
        description: 'Let your players do whatever they want whenever they want. No second layers. It might just make sense to cover their costs.'
      },
      {
        icon: '/images/uc-interactivity.png',
        title: 'Interactivity',
        description: 'Make game assets that interact with wallets, exchanges and third-party tools easily. Create ecosystems with lasting network effects.'
      },
      {
        icon: '/images/uc-typescript.png',
        title: 'TypeScript',
        description: 'Focus on your game logic instead of learning new programming languages and blockchain models. Find developers with ease.'
      },
    ],
  },
  {
    id: 'defi',
    title: 'DeFi',
    text: 'Trade anything at the speed of light.',
    list: [
      {
        icon: '/images/uc-fast.png',
        title: 'High TPS',
        description: 'Fast and cheap transactions unlock liquidity. Experience decentralized exchanges as comfortable as centralized ones.'
      },
      {
        icon: '/images/uc-objects.png',
        title: 'Objects',
        description: 'No matter what kind of digital asset you own, everything is an Aldea object that can be traded.'
      },
      {
        icon: '/images/uc-security.png',
        title: 'Security',
        description: 'On-chain markets mean you don’t give up control of your assets. On-chain source code means transparency and auditability by default.'
      },
    ],
  },
  {
    id: 'assets',
    title: 'Digital assets',
    text: 'New kinds of tokens. Powerful objects you can own.',
    list: [
      {
        icon: '/images/uc-typescript.png',
        title: 'TypeScript',
        description: 'Invent new assets using a language accessible to everyone. Learn how other assets work yourself using any explorer.'
      },
      {
        icon: '/images/uc-objects.png',
        title: 'Object Oriented',
        description: 'A computation paradigm perfect for digital assets. A type systems built for composability. Unleash your creativity and create new experiences for existing assets.'
      },
      {
        icon: '/images/uc-interactivity.png',
        title: 'Interactivity',
        description: 'Express and experience a fuller range of digital object relationships. Discover new network effects through objects calling, storing, and extending other objects.'
      },
    ],
  }, 
]

export const resourceLinks = [
  {
    url: 'https://docs.aldea.computer',
    label: 'Developer docs',
    text: 'Read our developer documentation.',
  },
  //{
  //  url: '#todo',
  //  label: 'Download Litepaper',
  //  text: 'Dive deeper into the tech behind Aldea.',
  //},
  {
    url: 'https://www.youtube.com/watch?v=h6actzI2cz0',
    label: 'Coding with Aldea',
    text: 'Watch what it\'s like to code with Aldea.',
  },
  //{
  //  url: '#todo',
  //  label: 'The pitch deck',
  //  text: 'Download our investor pitch deck.',
  //},
]

export const timelineYears = [
  {
    icon: 'checkmark',
    year: '2022',
    description: 'Plans are hatched, first lines of code written.',
  },
  {
    icon: 'explore',
    year: '2023 Q1/2',
    description: 'MVP mocknet, dev tools, explorer, and wallet.',
  },
  {
    icon: 'task',
    year: '2023 Q3/4',
    description: 'Devnet launched, Rust node, P2P network.',
  },
  //{
  //  icon: 'rocket',
  //  year: '2024',
  //  description: 'Q1 Testnet launches. Q2 Mainnet launches.',
  //},
]

export const teamMembers = [
  {
    image: '/images/brenton.png',
    name: 'Brenton Gunning',
    role: 'CEO, Engineering',
  }, {
    image: '/images/migue.png',
    name: 'Miguel Duarte',
    role: 'Engineering',
  }, {
    image: '/images/aaron.png',
    name: 'Aaron Russell',
    role: 'Engineering',
  }, {
    image: '/images/ani.png',
    name: 'Anabella Rizzi',
    role: 'Design',
  //}, {
  //  image: '/images/rius.png',
  //  name: 'Rius Chua',
  //  role: 'Partnerships',
  }
]

export const socialLinks = [
  { icon: 'twitter', url: 'https://twitter.com/aldeacomputer' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/company/aldea-computer/' },
  { icon: 'github', url: 'https://github.com/orgs/aldeacomputer' },
]
