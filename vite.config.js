import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  esbuild: true,
  runtimeCompiler: true,
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  server: {
    open: true
  }
})
