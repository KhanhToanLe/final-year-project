import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        'public': fileURLToPath(new URL('./public', import.meta.url)),
        'views': fileURLToPath(new URL('./src/views', import.meta.url)),
        'src': fileURLToPath(new URL('./src', import.meta.url)),
        'pages': fileURLToPath(new URL('./src/components/pages', import.meta.url)),
        'node_module': fileURLToPath(new URL('node_modules', import.meta.url)),
        'common': fileURLToPath(new URL('./src/common', import.meta.url)),
        'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        'base': fileURLToPath(new URL('./src/components/base', import.meta.url)),
        'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        "repository": fileURLToPath(new URL('./src/api/repository', import.meta.url)),
        'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      }
    },
  })
}