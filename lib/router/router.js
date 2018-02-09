const {
  E_NO_ROUTES,
  E_ROUTES_IS_NOT_ARRAY,
  E_ROUTE_MISSING_PATH,
  E_ROUTE_MISSING_EXEC
} = require('./../errors')

function router ({ server, drawer, routes }) {
  if (!routes) {
    return { error: E_NO_ROUTES }
  }
  if (routes.constructor !== Array) {
    return { error: E_ROUTES_IS_NOT_ARRAY }
  }

  for (const route of routes) {
    const { path, view, exec } = route
    let { method } = route
    method = method ? method.toLowerCase() : 'get'

    if (!path) {
      return { error: E_ROUTE_MISSING_PATH }
    }
    if (!exec) {
      return { error: E_ROUTE_MISSING_EXEC }
    }

    server[method](path, (req, res) => {
      const params = Object.assign({}, req.params, req.body, req.query)
      exec(
        Object.assign({}, drawer, { method, path, view, params }),
        req,
        res
      )
    })
  }

  return { error: null }
}

module.exports = router
