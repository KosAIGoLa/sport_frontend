import https from 'https'
import { URL } from 'url'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const targetUrl = query.url as string

  if (!targetUrl || !targetUrl.startsWith('https://hwplay.zoxo5.com/')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or missing url parameter' })
  }

  const url = new URL(targetUrl)

  return new Promise<void>((resolve, reject) => {
    const proxyReq = https.request(
      {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: event.node.req.method || 'GET',
        headers: {
          Accept: '*/*',
          'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
          Connection: 'keep-alive',
          Origin: 'https://if.slt2u.top',
          Referer: 'https://if.slt2u.top/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150", "Google Chrome";v="150"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"'
        }
      },
      (proxyRes) => {
        event.node.res.statusCode = proxyRes.statusCode || 200
        event.node.res.statusMessage = proxyRes.statusMessage || ''

        Object.entries(proxyRes.headers).forEach(([key, value]) => {
          if (value === undefined) return
          if (key.toLowerCase() === 'content-encoding') return
          if (key.toLowerCase() === 'transfer-encoding') return
          event.node.res.setHeader(key, value)
        })

        event.node.res.setHeader('Access-Control-Allow-Origin', '*')
        event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
        event.node.res.setHeader('Access-Control-Allow-Headers', '*')

        proxyRes.pipe(event.node.res)
        proxyRes.on('end', () => resolve())
        proxyRes.on('error', reject)
      }
    )

    proxyReq.on('error', reject)
    proxyReq.end()
  })
})
