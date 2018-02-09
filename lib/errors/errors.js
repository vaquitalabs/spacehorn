const chalk = require('chalk')
const color = chalk.red

const errors = {
  E_VIEWS_ENGINE_NEEDED: new Error(color('"viewsEngine" must be specified in config when using "viewsDir"')),
  E_INCOMPLETE_TEMPLATE_ENGINE: new Error(color('Custom template engine needs both "ext" and "engineFunc"')),
  E_MIDDLEWARE_NOT_ARRAY: new Error(color('Middelware passed in Spacehorn config must be an Array')),
  E_ROUTES_IS_NOT_ARRAY: new Error(color('The routes must be passed as an Array')),
  E_ROUTE_MISSING_PATH: new Error(color('There is a route that is missing the required "path"')),
  E_ROUTE_MISSING_EXEC: new Error(color('There is a route that is missing the required "exec" function')),
  E_NO_ROUTES: new Error(color('Forgot to add routes? At least one route is needed')),
  E_EXTEND_DRAWER_NOT_OBJECT: new Error(color('"extendDrawer" passed must be a key-value Object')),
  E_TRUST_PROXIES_NOT_ARRAY: new Error(color('"trustProxies" passed must be an Array'))
}

module.exports = errors
