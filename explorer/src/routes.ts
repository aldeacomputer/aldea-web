import { RouteRecordRaw } from 'vue-router'

import Home from './views/Home.vue'
import TxView from './views/Tx.vue'
import TxInstructionsView from './views/tx/Instructions.vue'
import TxOutputsView from './views/tx/Outputs.vue'
import TxPackagesView from './views/tx/Packages.vue'
import PkgView from './views/Package.vue'
import JigView from './views/Jig.vue'
import AddrView from './views/Address.vue'

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
      { name: 'tx_instructions', path: '', component: TxInstructionsView },
      { name: 'tx_outputs', path: 'outputs', component: TxOutputsView },
      { name: 'tx_packages', path: 'packages', component: TxPackagesView },
    ],
  },
  {
    name: 'pkg',
    path: '/pkg/:id',
    component: PkgView,
  },
  {
    name: 'jig',
    path: '/jig/:id',
    component: JigView,
  },
  {
    name: 'addr',
    path: '/address/:addr',
    component: AddrView,
  },
]
