import { link } from './export.js'
const lastHtml = link()
document.body.appendChild(lastHtml)
const m = (type: string, contain: number): string => Number(type + contain)
const c = '333'
console.log(c)
console.log(m('2', '3'))
// import background from './assets/logo.png'
// let image = new Image()
// image.src = background
// document.body.appendChild(image)
// import html from './html/a.html'
// import './index.md'

// js热更新
// module.hot.accept('./export.js', () => {
//   const inner = lastHtml.innerHTML
//   console.log(inner)
//   document.body.removeChild(lastHtml)
//   const newHtml = a()
//   newHtml.innerHTML = inner
//   document.body.appendChild(newHtml)
//   lastHtml = newHtml
//   console.log('./export.js模块更新了，需要手动处理')
// })

// console.log(tttest())
// // 图片热更新
// module.hot.accept('./assets/logo.png', () => {
//   image.src = background
// })
