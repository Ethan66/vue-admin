const path = require('path')

module.exports = {
  indexPath: 'blow/index.html',
  assetsDir: 'blow/static',
  publicPath: '/',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
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
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/variable.less')]
    }
  }
}
