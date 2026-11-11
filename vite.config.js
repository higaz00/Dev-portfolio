import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// O código-fonte fica em app.html. O build gera um único arquivo
// (JS, CSS e imagens embutidos) que é copiado para ./index.html,
// permitindo abrir o site direto no navegador (duplo clique).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  server: { open: '/app.html' },
  build: {
    assetsInlineLimit: 100000000,
    rollupOptions: { input: 'app.html' },
  },
})
