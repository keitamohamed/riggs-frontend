import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/riggs": "http://localhost:8080",
      "/admin": "http://localhost:4500"
    }
  },
  plugins: [react()],
})
