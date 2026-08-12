import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/SalaryWise/', // Explicit GitHub Pages subpath base
  server: {
    host: true, // Expose to local network / Wi-Fi
    port: 5173,
  },
})
