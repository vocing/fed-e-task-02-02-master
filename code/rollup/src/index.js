// import { logger } from './logger'

// import message from './message'
// import { name, version } from '../package.json'
// console.log(name, version)

// import _ from 'lodash-es'
// console.log(_)

// import cjs from './cjs-module'
// console.log(cjs)

// const msg = message.hi

// console.log(msg)
// logger(msg)

import('./logger').then(({ logger }) => {
  logger('code splitting')
})
