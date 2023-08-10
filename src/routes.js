import Password from './views/Password.vue'
import Encrypt from './views/Encrypt.vue'
import Settings from './views/Settings.vue'

import { Password as PasswordIcon, Encryption, Settings as SettingsIcon } from '@vicons/carbon'

export const routes = [
  { name: 'Password', path: '/', component: Password, icon: PasswordIcon },
  { name: 'Encrypt', path: '/encrypt', component: Encrypt, icon: Encryption },
  { name: 'Settings', path: '/settings', component: Settings, icon: SettingsIcon },
]