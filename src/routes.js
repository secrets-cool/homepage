import Password from './views/Password.vue'
import Encrypt from './views/Encrypt.vue'
import Settings from './views/Settings.vue'

export const routes = [
  { name: 'Password', path: '/', component: Password },
  { name: 'Encrypt', path: '/encrypt', component: Encrypt },
  { name: 'Settings', path: '/settings', component: Settings },
]