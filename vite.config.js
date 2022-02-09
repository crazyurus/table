import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  esbuild: true,
  plugins: [createVuePlugin()],
  server: {
    open: true
  }
}
