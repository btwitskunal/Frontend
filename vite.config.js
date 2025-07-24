import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests to your backend
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Only needed if you're using HTTPS with invalid certificates
      }
    }
  }
})