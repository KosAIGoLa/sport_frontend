import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
import { compression } from 'vite-plugin-compression2'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  sourcemap: {
    server: false,
    client: false
  },
  nitro: {
    sourcemap: false
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      cssnano: {
        preset: ['default', { calc: false }]
      }
    }
  },
  vite: {
    build: {
      sourcemap: false,
      modulePreload: {
        polyfill: false
      }
    },
    plugins: [
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
