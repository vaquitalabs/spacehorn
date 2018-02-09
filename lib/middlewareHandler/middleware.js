const morgan = require('morgan')
const requestLogger = require('./requestLogger')
const { E_MIDDLEWARE_NOT_ARRAY } = require('./../errors')

function middlewareHandler ({ server, drawer, middleware, setLogger }) {
  if (middleware.constructor !== Array) {
    return { error: E_MIDDLEWARE_NOT_ARRAY }
  }

  if (setLogger || setLogger === undefined) {
    middleware.push(requestLogger)
    server.use(morgan(':status - :response-time ms'))
  }

  for (const mw of middleware) {
    const hasPath = mw.constructor === Object
    const func = hasPath ? mw.run : mw
    const args = func.toString().split('{')[0].match(/\(([^)]*)\)/)[1].split(',')
    const hasDrawer = args.length > 3
    let funcReady = func

    if (hasDrawer) {
      funcReady = (req, res, next) => { func(drawer, req, res, next) }
    }

    if (hasPath) {
      server.use(mw.path, funcReady)
    } else {
      server.use(funcReady)
    }
  }
  return { error: null }
}

module.exports = middlewareHandler
