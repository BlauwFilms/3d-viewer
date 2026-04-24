import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf-8'),
);

const monorepoRoot = resolve(__dirname, '../..');

export default defineConfig(({ command }) => ({
  root: command === 'serve' ? monorepoRoot : __dirname,

  define: {
    __BLAUW_VERSION__: JSON.stringify(pkg.version),
  },

  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: false,
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'blauw.mjs',
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/src/engine.ts') ||
            id.includes('node_modules/three')
          ) {
            return 'engine';
          }
          return undefined;
        },
        chunkFileNames: 'engine-[hash].js',
        entryFileNames: 'blauw.mjs',
      },
    },
  },

  server: {
    port: 5173,
    open: '/examples/basic.html',
  },
}));