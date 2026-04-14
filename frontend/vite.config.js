import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_API_URL || 'http://localhost:8000'

  return defineConfig({
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/auth': apiUrl,
        '/closet': apiUrl,
        '/recommendations': apiUrl,
      },
    },
  })
}
