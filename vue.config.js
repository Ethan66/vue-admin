module.exports = {
  indexPath: 'blow/index.html',
  assetsDir: 'blow/static',
  publicPath: '/',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
        // target: 'http://10.0.1.76:8210'
        // target: 'http://10.0.0.43:8210'
      },
      '/uploadFile': {
        target: 'https://tconsole4.bailingpay.com',
        changeOrigin: true
      }
    }
  }
}
