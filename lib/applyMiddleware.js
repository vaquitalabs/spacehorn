import { MIDDLEWARE_NOT_ARRAY } from './messages/error'

function applyMiddleware(app, drawer, middleware) {
  if (middleware.constructor === Array) {
    for (let i = 0; i < middleware.length; i++) {
      let mddw = middleware[i]
      let mddwFunc = mddw.constructor === Object ? mddw.run : mddw
      let mddwArgs = mddwFunc.toString().split('{')[0].match(/\(([^)]*)\)/)[1].split(',')
      let mddwReady = mddwFunc
      let mddwHasDrawer = mddwArgs.length > 3

      if (mddwHasDrawer) {
        mddwReady = (req, res, next) => {
          mddwFunc(drawer, req, res, next)
        }
      }

      if (mddw.constructor === Object) {
        app.use(mddw.path, mddwReady)
      } else {
        app.use(mddwReady)
      }
    }
  }
  else {
    throw new Error(MIDDLEWARE_NOT_ARRAY(app.appName))
  }
}

export default applyMiddleware
