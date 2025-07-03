import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    fs: {
      strict: false,
    },
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
  },
  preview: {
    fallback: 'index.html',
  },
})
