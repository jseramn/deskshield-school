import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Project Pages URL: https://jseramn.github.io/deskshield-school/
  base: '/deskshield-school/',
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
})
