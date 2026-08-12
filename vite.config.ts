import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Ensures relative assets work on GitHub Pages & local dev
  server: {
    host: true, // Expose to local network / Wi-Fi
    port: 5173,
  },
})
