import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8000',
      '/closet': 'http://localhost:8000',
      '/recommendations': 'http://localhost:8000',
    },
  },
})
