import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Découpage vendor stable : le code applicatif peut changer sans
        // invalider le hash des chunks tiers — meilleur cache navigateur.
        // (Vite 8 / Rolldown : codeSplitting.groups remplace manualChunks.)
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/](framer-motion|lenis)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
