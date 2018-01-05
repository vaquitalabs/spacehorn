const {
  ROUTES_IS_NOT_ARRAY,
  ROUTE_MISSING_PATH,
  ROUTE_MISSING_EXEC,
} = require('./messages/error')

function router(app, exoDrawer, routes){
  if (routes.constructor !== Array)
    throw new Error(ROUTES_IS_NOT_ARRAY(app.appName, routes.constructor.name))
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    const { path, view, exec } = route
    let { method } = route
    method = method ? method.toLowerCase() : 'get'

    if (!path)
      throw new Error(ROUTE_MISSING_PATH(app.appName))
    if (!exec)
      throw new Error(ROUTE_MISSING_EXEC(app.appName))

    let drawer = { ...exoDrawer, method, path, view }

    app[method](path, (req, res) => {
      let params = { ...req.params, ...req.body, ...req.query }
      drawer.params = params
      exec(drawer, req, res)
    })
  }
}

module.exports = router
