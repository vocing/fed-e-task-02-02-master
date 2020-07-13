const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 自定义插件
class myPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('myPlugin', (compilation) => {
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const content = compilation.assets[name].source()
          // 核心实现，replace替换资源内容, 此处为清除/*****/注释
          const newContent = content.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => newContent,
            size: () => newContent.length,
          }
        }
      }
    })
  }
}

// @env 通过cli传递的环境名参数, @argv 运行cli过程中的所有参数
module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js',
    a: './src/a.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  devtool: 'eval',
  devServer: {
    hotOnly: true,
    contentBase: ['./public'], // 额外为开发服务器指定的资源查找目录
    proxy: {
      '/api': {
        // 接口首个目录名
        target: '', // 目标地址
        pathRewrite: {
          // 地址重写
          '^/api': '',
        },
        changeOrigin: true, // 跨域
      },
    },
  },
  module: {
    rules: [
      //   {
      //     test: /.html$/,
      //     use: {
      //       loader: 'html-loader',
      //       options: {
      //         attributes: {
      //           list: [
      //             {
      //               tag: 'img',
      //               attribute: 'src',
      //               type: 'src',
      //             },
      //             {
      //               tag: 'a',
      //               attribute: 'href',
      //               type: 'src',
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   },
      {
        test: /.(jpg|jpge|png|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /.md$/,
        use: ['html-loader', './markdown-loader'],
      },
    ],
  },
  plugins: [
    // new myPlugin(),
    // 注入全局变量
    // new webpack.DefinePlugin({
    //   tttest: () => {
    //     console.log(123)
    //   },
    // }),
    new HtmlWebpackPlugin({
      title: 'my test', // html-loader插件会将页面中的变量解析为正常的html文件,如果要在页面中使用htmlwebpackplugin变量则需要注释这个插件
      meta: {
        viewport: 'width=divice-width',
      },
      template: './public/index.html',
      filename: 'main.html',
      chunks: ['main'], // 指定注入的bundle, 如果不指定, 文件将引入所有打包后的js
    }),
    new HtmlWebpackPlugin({
      title: 'my test2', // html-loader插件会将页面中的变量解析为正常的html文件,如果要在页面中使用htmlwebpackplugin变量则需要注释这个插件
      meta: {
        viewport: 'width=divice-width',
      },
      filename: 'main2.html',
      chunks: ['a'], // 指定注入的bundle, 如果不指定, 文件将引入所有打包后的js
    }),
  ],
  optimization: {
    usedExports: true, // 打包后标识不会被使用到的模块, 标识为：/* unused harmony export 模块名 */
    minimize: true, // 清除不必要的注释
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 10,
      name: 'common',
      minChunks: 1,
    },
  },
}
