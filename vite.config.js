import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    importToCDN({
      prodUrl: 'https://cdn.secrets.cool/{name}@{version}/{path}',
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
