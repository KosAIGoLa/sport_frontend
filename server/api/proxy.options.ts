export default defineEventHandler((event) => {
  event.node.res.setHeader('Access-Control-Allow-Origin', '*')
  event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  event.node.res.setHeader('Access-Control-Allow-Headers', '*')
  event.node.res.statusCode = 204
  return ''
})
