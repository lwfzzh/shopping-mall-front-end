const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6061,
    host: 'localhost',
    open: true,
    https: false,
    proxy: {
      'api': {
        target: 'https://localhost:6060',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  }
})
