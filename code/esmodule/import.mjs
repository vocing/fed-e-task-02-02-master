// import { c, default as b} from './export.js'
// b()
// console.log(c)

// 实验特性, 使用.mjs尾缀
// 运行 node --experimental-modules [文件名]
// import { foo, bar } from './module.mjs'
// console.log(foo)

// console.log(require)
// console.log(module)
// console.log(exports)
// console.log(__filename)
// console.log(__dirname)

// node 8.11.3版本无法打印下条数据, 10.15.0可以
console.log(import.meta.url)

// 文件路径
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
console.log(__filename)

// 项目路径
import { dirname } from 'path'
console.log(dirname(__filename))
