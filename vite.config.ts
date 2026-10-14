import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'sales-route',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/sales' || url === '/sales/') {
              req.url = '/';
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/sales' || url === '/sales/') {
              req.url = '/sales/index.html';
            }
            next();
          });
        },
      },
    ],
  };
});
