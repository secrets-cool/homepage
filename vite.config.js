import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      prodUrl: 'https://npm.elemecdn.com/{name}@{version}/{path}',
      modules: [
        autoComplete('vue'),
        {
          name: 'naive-ui',
          var: 'naive',
          path: 'dist/index.prod.js'
        }
      ]
    })
  ],
  server: {
    port: 15173,
  }
})
