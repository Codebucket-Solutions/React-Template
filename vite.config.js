import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import importMetaEnv from '@import-meta-env/unplugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  const otlpTarget = process.env.OBS_OTLP_HTTP_URL || 'http://127.0.0.1:4318';

  return {
    plugins: [
      react(),
      importMetaEnv.vite({
        example: '.env.example',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'react-picky': path.resolve(__dirname, 'node_modules/react-picky/dist/index.js'),
      },
    },
    server: {
      proxy: {
        '/telemetry': {
          target: otlpTarget,
          changeOrigin: true,
          rewrite: (requestedPath) => requestedPath.replace(/^\/telemetry/, ''),
        },
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
  };
});
