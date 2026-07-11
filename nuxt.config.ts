import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
import { compression } from 'vite-plugin-compression2'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fastBuild = process.env.FAST_BUILD === '1'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    viewTransition: true
  },
  sourcemap: {
    server: false,
    client: false
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    buildAssetsDir: '/build-assets/',
    head: {
      meta: [
        { name: 'viewport', content: 'maximum-scale=1,minimum-scale=1,user-scalable=0,width=device-width,initial-scale=1' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' }
      ]
    }
  },
  nitro: {
    static: true,
    output: {
      publicDir: resolve(__dirname, 'dist')
    },
    prerender: {
      routes: ['/', '/liveType.html', '/match.html', '/download', '/room/506605', '/room/238362', '/room/765648', '/room/551893', '/room/1573951', '/room/896956', '/room/491355', '/room/287671', '/room/308116', '/room/534857', '/room/774913', '/room/572879', '/room/160590']
    },
    routeRules: {
      '/**': {
        headers: {
          'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https:; media-src 'self' https: blob:; object-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';"
        }
      }
    }
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/view-transitions.css',
    '~/assets/css/player-danmu.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {
        preset: ['default', { calc: false }]
      }
    }
  },
  vite: {
    optimizeDeps: {
      // 开发态预构建，避免动态 import 触发页面 reload
      include: [
        'xgplayer',
        'xgplayer-flv',
        'xgplayer/es/plugins/danmu/index.js'
      ]
    },
    build: {
      sourcemap: false,
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/xgplayer') || id.includes('node_modules/xgplayer-flv')) {
              return 'xgplayer'
            }
          }
        }
      }
    },
    plugins: fastBuild
      ? []
      : [
          obfuscatorPlugin({
            include: [/\.(js|ts|vue|mjs|cjs)$/],
            exclude: [/node_modules/, /\.nuxt/],
            apply: 'build',
            options: {
              compact: true,
              controlFlowFlattening: false,
              deadCodeInjection: false,
              debugProtection: false,
              identifierNamesGenerator: 'hexadecimal',
              log: false,
              numbersToExpressions: false,
              renameGlobals: false,
              rotateStringArray: true,
              selfDefending: true,
              sourceMap: false,
              stringArray: true,
              stringArrayEncoding: [],
              stringArrayThreshold: 0.75,
              unicodeEscapeSequence: false
            }
          }),
          compression({
            algorithms: ['gzip', 'brotliCompress']
          })
        ]
  }
})
