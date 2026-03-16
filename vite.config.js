import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import importMetaEnv from '@import-meta-env/unplugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default defineConfig({
  plugins: [
    react(),
    importMetaEnv.vite({
      example: '.env.example',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "react-picky": path.resolve(__dirname, "node_modules/react-picky/dist/index.js"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/css/global" as *;
          @use "@/assets/css/_variables" as *;
        `,
      },
    },
  },
})
