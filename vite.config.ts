import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      'public':fileURLToPath(new URL('./public', import.meta.url)),
      'views':fileURLToPath(new URL('./src/views', import.meta.url)), 
      'src': fileURLToPath(new URL('./src', import.meta.url)),
      'pages': fileURLToPath(new URL('./src/components/pages', import.meta.url)),
      'node_module':fileURLToPath(new URL('node_modules', import.meta.url)),
      'common':fileURLToPath(new URL('./src/common', import.meta.url))

    }
  }
})
