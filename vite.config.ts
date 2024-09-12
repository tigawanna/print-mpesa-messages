import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',

    injectRegister: false,
    
    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'print-mpesa-messages',
      short_name: 'm-print',
      description: 'Paste your M-PESA messages from WhatsApp and instantly generate a printable, formatted PDF.',
      theme_color: '#000000',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
