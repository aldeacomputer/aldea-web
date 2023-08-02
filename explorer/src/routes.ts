import { RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'
import TxView from './views/Tx.vue'
import TxInstructionsTab from './views/tx/Instructions.vue'
import TxOutputsTab from './views/tx/Outputs.vue'
import TxPackagesTab from './views/tx/Packages.vue'
import PkgView from './views/Package.vue'
import PkgDocsTab from './views/pkg/Docs.vue'
import PkgSourceTab from './views/pkg/Source.vue'
import PkgAbiTab from './views/pkg/Abi.vue'
import JigView from './views/Jig.vue'
import JigStateTab from './views/jig/State.vue'
import JigHistoryTab from './views/jig/History.vue'
import AddrView from './views/Address.vue'
import AddrJigsTab from './views/addr/Jigs.vue'
import AddrTxnsTab from './views/addr/Txns.vue'

export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'tx',
    path: '/tx/:id',
    component: TxView,
    children: [
      { name: 'tx_instructions', path: '', component: TxInstructionsTab },
      { name: 'tx_outputs', path: 'outputs', component: TxOutputsTab },
      { name: 'tx_packages', path: 'packages', component: TxPackagesTab },
    ],
  },
  {
    name: 'pkg',
    path: '/pkg/:id',
    component: PkgView,
    children: [
      { name: 'pkg_docs', path: '', component: PkgDocsTab },
      { name: 'pkg_src', path: 'source', component: PkgSourceTab },
      { name: 'pkg_abi', path: 'abi', component: PkgAbiTab },
    ]
  },
  {
    name: 'jig',
    path: '/jig/:id',
    component: JigView,
    children: [
      { name: 'jig_state', path: '', component: JigStateTab },
      { name: 'jig_history', path: '', component: JigHistoryTab },
    ]
  },
  {
    name: 'addr',
    path: '/address/:addr',
    component: AddrView,
    children: [
      { name: 'addr_jigs', path: '', component: AddrJigsTab },
      { name: 'addr_txns', path: 'txs', component: AddrTxnsTab },
    ]
  },
]
