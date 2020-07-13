import foo from './foo.js'
import $ from 'jquery'
$(document.body).append('<div>123213</div>')
foo.bar()

if (module.hot) {
  module.hot.accept(() => {
    console.log('HMR')
  })
}
