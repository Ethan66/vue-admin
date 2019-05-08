module.exports = {
  indexPath: 'blfa/index.html',
  assetsDir: 'blfa/static',
  publicPath: '/',
  devServer: {
    proxy: {
      '/bl/console': {
        target: 'https://tconsole3.bailingpay.com'
      },
      '/uploadFile': {
        target: 'https://tconsole3.bailingpay.com',
        changeOrigin: true
      }
    }
  }
}
