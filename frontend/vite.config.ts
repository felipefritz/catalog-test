// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    chunkSizeWarningLimit: 4000000,
  },
})
