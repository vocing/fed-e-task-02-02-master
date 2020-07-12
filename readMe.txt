一、简答题
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
答: 就webpack本身而言, 它是仅是一个模块化打包工具, 但对于工程化而言, 它需要一些loader、plugin的配合。
    构建流程主要环节: 
       a、入口、出口文件路径
       b、loader加载器和其他npm模块, 包括:
          css(包括兼容性、函数式、预编译等功能的加载器: css-loader、postcss-loader、(less|sass|stylus)-loader等, 压缩: uglifycss)
          js(编译相关: babel-loader及依赖@babel/core, 压缩: uglify-js)
          file(文件复制、压缩: file-loader、url-loader)
          html(静态资源模块化: html-loader)
       c、html相关plugin: 
          html-webpack-plugin(生成html并注入打包后的js、css、img等资源路径)
          copy-webpack-plugin(复制文件)
          uglifyjs-webpack-plugin(压缩代码)


2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
   Loader 专注实现资源模块的加载
   Plugin 解决除了资源加载以外的自动化功能
   开发思路: module.exports导出一个方法, 该方法会通过一些操作对于入参的数据流进行处理, 返回一个处理结果的值;


二、编程题
1、使用 Webpack 实现 Vue 项目打包任务
具体任务及说明：

先下载任务的基础代码  百度网盘链接: https://pan.baidu.com/s/1pJl4k5KgyhD2xo8FZIms8Q 提取码: zrdd

这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构

有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）

这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务

尽可能的使用上所有你了解到的功能和特性

作业要求

本次作业中的编程题要求大家完成相应代码后（二选一）

1.  简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

2.  提交一个项目说明文档，要求思路流程清晰。

最终将录制的视频或说明文档和代码统一提交至作业仓库。

答: 提交项目说明文档, 文档参见./vue-app-base/项目说明文档.md