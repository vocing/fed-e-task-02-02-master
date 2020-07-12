const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const del = require('del')
const common = require('./webpack.common.js')

const config = merge(common, {
  mode: 'production',
  output: {
    publicPath: './',
    filename: `js/[name].[chunkhash].js`,
    chunkFilename: `js/[id].[chunkhash].js`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: __dirname + '/public/static',
          to: __dirname + '/dist/static',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'my test',
      meta: {
        viewport: 'width=device-width,initial-scale=1,user-scalable=0',
      },
      template: './public/index.html',
    }),
  ],
  performance: {
    hints: 'error',
    maxAssetSize: 300000,
    maxEntrypointSize: 500000,
  },
  optimization: {
    usedExports: true, // 打包后标识不会被使用到的模块, 标识为：/* unused harmony export 模块名 */
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 10,
      name: 'common',
      minChunks: 1,
    },
  },
})
module.exports = new Promise(async (resolve, rejecet) => {
  await del(['dist'])
  resolve(config)
})
