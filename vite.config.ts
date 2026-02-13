/// <reference types="vitest" />
import path from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { normalizePath } from 'vite';
import { globSync } from 'tinyglobby';

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = normalizePath(process.cwd());

/**
 * Injects ANALOG_CONTENT_ROUTE_FILES into the content package so injectContent() can load
 * markdown. The platform only injects this into the router package; the content package
 * has its own empty copy, so we populate it here with the same src/content glob.
 */
function contentRouteFilesPlugin() {
  let root: string;
  return {
    name: 'analog-content-route-files-in-content-package',
    configResolved(config: { root?: string }) {
      root = normalizePath(resolve(workspaceRoot, config.root || '.') || '.');
    },
    transform(code: string, id: string) {
      if (
        !id.includes('@analogjs/content') ||
        !code.includes('ANALOG_CONTENT_ROUTE_FILES')
      ) {
        return null;
      }
      const contentRouteFiles = globSync([`${root}/src/content/**/*.md`], {
        dot: true,
        absolute: true,
      });
      const replacement = contentRouteFiles
        .map((module) => {
          const key = module.startsWith(root) ? module.replace(root, '') : module;
          return `"${key}": () => import('${module}?analog-content-file=true').then(m => m.default)`;
        })
        .join(',');
      const newCode = code.replace(
        'let ANALOG_CONTENT_ROUTE_FILES = {};',
        `let ANALOG_CONTENT_ROUTE_FILES = {${replacement}};`
      );
      return newCode !== code ? { code: newCode, map: null } : null;
    },
  };
}

export default defineConfig(({ mode }) => ({
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.debug'] : [],
      },
      format: { comments: false },
    },
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'angular-core': ['@angular/core', '@angular/common', '@angular/platform-browser'],
          'angular-router': ['@angular/router'],
          'analog-content': ['@analogjs/content', '@analogjs/router'],
          'monaco-editor': ['monaco-editor'],
          'mermaid': ['mermaid'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name;
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(name!)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name!)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        },
      },
    },
  },

  resolve: {
    mainFields: ['module'],
    alias: [
      {
        find: '../../../../@vscode/l10n',
        replacement: path.resolve(__dirname, 'node_modules/@vscode/l10n'),
      },
    ],
  },

  ssr: {
    noExternal: [],
    external: ['monaco-editor', 'mermaid'],
  },

  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/router',
    ],
    // Exclude so platform + our plugin transform @analogjs/content (ANALOG_CONTENT_*)
    exclude: ['monaco-editor', 'mermaid', '@analogjs/content'],
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

  plugins: [
    contentRouteFilesPlugin(),
    analog({
      // Prerendering routes (customize as needed)
      prerender: {
        routes: async () => [
          '/',
          '/oop',
          '/dsa',
          '/spring-boot',
          '/system-design',
          // ... add all content paths
        ],
        sitemap: {
          host: 'https://devmastery.com',
        },
      },

      // ✅ Correct content configuration for Analog v1.x
      content: {
        // Use Shiki for syntax highlighting (built‑in)
        highlighter: 'shiki',

        // Markdown lives in `src/content/` (Analog default); no extra dirs needed.


      },
    }),

    tailwindcss(),

    compression({ algorithm: 'gzip', ext: '.gz' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),

    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));