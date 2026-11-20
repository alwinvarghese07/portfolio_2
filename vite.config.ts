import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteSpotifyPlugin } from './scripts/vite-spotify-plugin'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 5173,
    host: true,
  },
  plugins: [
    tailwindcss(),
    react(),
    ViteImageOptimizer(),
    viteSpotifyPlugin(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion'],
          lenis: ['@studio-freight/lenis'],
          matter: ['matter-js']
        }
      }
    }
  }
})
