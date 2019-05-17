module.exports = {
  indexPath: 'blow/index.html',
  assetsDir: 'blow/static',
  publicPath: '/',
  devServer: {
    proxy: {
      '/bl/console': {
        target: 'https://tconsole4.bailingpay.com'
      },
      '/uploadFile': {
        target: 'https://tconsole3.bailingpay.com',
        changeOrigin: true
      }
    }
  }
}
