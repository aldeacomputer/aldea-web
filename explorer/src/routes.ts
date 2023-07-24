import Home from './views/Home.vue'
import TxView from './views/Tx.vue'
import PkgView from './views/Package.vue'
import JigView from './views/Jig.vue'
import AddrView from './views/Address.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/tx', component: TxView },
  { path: '/pkg', component: PkgView },
  { path: '/jig', component: JigView },
  { path: '/addr', component: AddrView },
]
