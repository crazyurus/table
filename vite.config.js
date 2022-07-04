import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  esbuild: true,
  runtimeCompiler: true,
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  server: {
    open: true
  }
})
