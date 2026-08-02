import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production';

  return {
    plugins: [
      react({
        include: '**/*.tsx',
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: 'localhost',
      port: 3000,
      strictPort: false,
      hmr: isDev
        ? {
            port: 24679,
            protocol: 'ws',
            host: 'localhost',
            clientPort: 24679,
            overlay: true,
          }
        : false,
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              usePolling: false,
              useFsEvents: true,
              ignored: ['**/node_modules/**', '**/dist/**'],
            },
      open: false,
      cors: {
        origin: '*',
      },
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    preview: {
      host: 'localhost',
      port: 4173,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'lucide-react',
        'motion/react',
        'react-markdown',
      ],
      exclude: [],
    },
    build: {
      target: 'es2022',
      outDir: 'dist',
      sourcemap: false,
      cssMinify: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion/react'],
            icons: ['lucide-react'],
            markdown: ['react-markdown'],
          },
        },
      },
    },
    esbuild: {
      jsx: 'automatic',
      target: 'es2022',
      legalComments: 'none',
    },
  };
});
