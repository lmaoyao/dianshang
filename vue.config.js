module.exports = {
  lintOnSave:false,
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        // target: 'http://111.0.33.38:26080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'common':"@/common",
        'network':"@/network"
      }
    }
  },
}