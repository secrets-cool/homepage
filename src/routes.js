import Hash from './views/Hash.vue'
import Crypto from './views/Crypto.vue'
import Settings from './views/Settings.vue'

import { Password as PasswordIcon, Encryption, Settings as SettingsIcon } from '@vicons/carbon'

export const routes = [
  { name: 'Password', path: '/', component: Hash, icon: PasswordIcon },
  { name: 'Encrypt', path: '/crypto', component: Crypto, icon: Encryption },
  { name: 'Settings', path: '/settings', component: Settings, icon: SettingsIcon },
]