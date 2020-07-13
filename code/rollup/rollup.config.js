// 工具：转换JSON为导出JS
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: {
    foo: './src/index',
    boo: './src/album',
  },
  output: {
    // file: 'dist/bundle.js', // 不拆分时生成的文件
    dir: 'dist', // 代码拆分的生成目录
    format: 'amd', // 代码生成方式(规范)
  },
  plugins: [json(), resolve(), commonjs()],
}
