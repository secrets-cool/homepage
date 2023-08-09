export const routes = [
  { name: 'Password', path: '/', component: () => import('./views/Password.vue') },
  { name: 'Encrypt', path: '/encrypt', component: () => import('./views/Encrypt.vue') },
  { name: 'Settings', path: '/settings', component: () => import('./views/Settings.vue') },
]