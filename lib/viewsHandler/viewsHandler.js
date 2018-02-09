const {
  E_VIEWS_ENGINE_NEEDED,
  E_INCOMPLETE_TEMPLATE_ENGINE
} = require('./../errors')

function viewsHandler ({ server, viewsDir, viewsEngine }) {
  if (!viewsEngine) {
    return { error: E_VIEWS_ENGINE_NEEDED }
  }
  server.set('views', viewsDir)
  if (viewsEngine.constructor === String) {
    server.set('view engine', viewsEngine)
  }
  if (viewsEngine.constructor === Object) {
    const { ext, engineFunc } = viewsEngine
    if (!ext || !engineFunc) {
      return { error: E_INCOMPLETE_TEMPLATE_ENGINE }
    }
    server.engine(ext, engineFunc)
    server.set('view engine', ext)
  }
  return { error: null }
}

module.exports = viewsHandler
