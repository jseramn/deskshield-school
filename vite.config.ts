import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Project Pages asset base (no live Pages site from this repo today).
  base: '/deskshield-school/',
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
})
