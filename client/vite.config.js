import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'TaskBasket',
      short_name: 'TB',
      description: 'My Vite application as a PWA',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    srcDir: 'src',
    filename: 'sw.js', // specify the custom service worker file
    strategies: 'injectManifest' // use injectManifest strategy for custom service worker
  })],
  base: 'https://task-basket.vercel.app/',
  publicDir: 'public',
  server:{
    host:'0.0.0.0',
  port:7543

  }
})


