import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Project Pages URL: https://jseramn.github.io/deskshield-school/
  base: '/deskshield-school/',
  plugins: [react()],
})
