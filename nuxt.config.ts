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
  /**
   * 组件目录约定：
   * - layout / home / common / icon / auth / player：扁平命名（无前缀）
   * - room / user / match / news / download / recharge：显式前缀（如 RoomPlayer）
   */
  components: [
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/home', pathPrefix: false },
    { path: '~/components/common', pathPrefix: false },
    { path: '~/components/icon', pathPrefix: false },
    { path: '~/components/auth', pathPrefix: false },
    { path: '~/components/player', pathPrefix: false },
    { path: '~/components/room', prefix: 'Room', pathPrefix: false },
    { path: '~/components/user', prefix: 'User', pathPrefix: false },
    { path: '~/components/match', prefix: 'Match', pathPrefix: false },
    { path: '~/components/news', prefix: 'News', pathPrefix: false },
    { path: '~/components/download', prefix: 'Download', pathPrefix: false },
    { path: '~/components/recharge', prefix: 'Recharge', pathPrefix: false }
  ],
  /** 嵌套 composables 目录需显式扫描（auth / player / room / i18n / navigation） */
  imports: {
    dirs: [
      'composables',
      'composables/**'
    ]
  },
  experimental: {
    // 启用 Nuxt 内置 View Transitions 插件
    viewTransition: true,
    // 避免 dev 时 Vite 解析失败：Failed to resolve import "#app-manifest"
    appManifest: false
  },
  sourcemap: {
    server: false,
    client: false
  },
  app: {
    /**
     * 注意：app.viewTransition 会导出为 appViewTransition。
     * 插件读取的是 defaultViewTransition.enabled，必须是对象形态。
     * 'always' 忽略 prefers-reduced-motion，确保导览点击一定有过渡。
     * 关闭 Vue pageTransition，避免与 View Transitions API 抢动画。
     */
    pageTransition: false,
    viewTransition: {
      enabled: 'always'
    },
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
    '~/assets/css/base/tailwind.css',
    '~/assets/css/base/view-transitions.css',
    '~/assets/css/base/player-danmu.css'
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
