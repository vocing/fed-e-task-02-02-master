const common = require('./webpack.common.js')
const htmlWebpackPlugin = require('html-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const portfinder = require('portfinder')
const stylelintWebpackPlugin = require('stylelint-webpack-plugin')

const config = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: 'localhost',
    hotOnly: true,
    contentBase: ['./public'],
    proxy: {
      '/api': {
        target: '', // 转发的目标地址
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new htmlWebpackPlugin({
      title: 'my test',
      meta: {
        viewport: 'width=divice-width',
      },
      template: './public/index.html',
    }),
    new stylelintWebpackPlugin({
      files: ['src/**/*.less', 'src/**/*.css', 'src/**/*.vue'],
    }),
  ],
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.devServer.port
  portfinder.getPort((error, port) => {
    if (error) {
      reject(err)
    } else {
      config.devServer.port = port
      config.plugins.push(
        new friendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: ${
                config.https ? 'https' : 'http'
              }://${config.devServer.host}:${port}`,
            ],
          },
        })
      )
      resolve(config)
    }
  })
})
