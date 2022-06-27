import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions = {
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    id: '/',
    name: 'Scrap Screen Recorder',
    short_name: 'Scrap',
    scope: '/',
    start_url: '/',
    description: 'Use Scrap to record any screen or window directly from your browser',
    theme_color: '#3f3959',
    background_color: '#36314f',
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'maskable_icon.png',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  } as Partial<VitePWAOptions>
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA(pwaOptions)
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/_variables.scss";
          @import "./src/assets/styles/_styles.scss";
        `,
      },
    },
  },
})
