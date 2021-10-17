const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    '/api',
    proxy.createProxyMiddleware({
      target: 'http://ifb399-api.juntao.life:48080/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
