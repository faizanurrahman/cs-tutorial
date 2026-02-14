/// <reference types="vitest" />
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  assetsInclude: ['**/*.java', '**/*.py'],
  resolve: {
    mainFields: ['module'],
    alias: [
      {
        find: '../../../../@vscode/l10n',
        replacement: path.resolve(__dirname, 'node_modules/@vscode/l10n'),
      },
    ],
  },

  server: {
    port: 4200,
    host: '0.0.0.0',
    fs: { allow: ['..'] },
    open: false,
  },

  preview: {
    port: 4200,
    host: '0.0.0.0',
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },

  // plugins: [
  //   tailwindcss(),
  // ],
}));
