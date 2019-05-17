module.exports = {
  indexPath: 'blow/index.html',
  assetsDir: 'blow/static',
  publicPath: '/',
  devServer: {
    proxy: {
      '/bl/console': {
        // target: 'https://tconsole4.bailingpay.com'
        target: 'http://10.0.1.76:8210'
      },
      '/uploadFile': {
        target: 'https://tconsole4.bailingpay.com',
        changeOrigin: true
      }
    }
  }
}
