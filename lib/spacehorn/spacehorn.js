const chalk = require('chalk')
const server = require('./../server')
const viewsHandler = require('./../viewsHandler')
const drawer = require('./../drawer')
const trustProxies = require('./../trustProxies')
const securityGuard = require('./../security')
const middlewareHandler = require('./../middlewareHandler')
const router = require('./../router')

function Spacehorn (config) {
  const {
    name,
    port,
    publicDir,
    db,
    routes,
    logger,
    viewsDir,
    viewsEngine,
    extendDrawer,
    trustProxies: proxyRules,
    middleware,
    httpRequestsLog,
    security
  } = config

  /* ==============================
  *  ASSIGN PROPS
  ============================== */
  this.name = name || 'Spacehorn App'
  this.port = port || 3000
  this.logger = logger || console
  this.publicDir = publicDir
  this.viewsDir = viewsDir
  this.viewsEngine = viewsEngine
  this.server = server(this)
  this.drawer = drawer({ logger: this.logger, db, extendDrawer })

  if (this.drawer.error) return this.logger.error(this.drawer.error)

  /* ==============================
  *  VIEWS HANDLING
  ============================== */
  if (this.viewsDir) {
    const { error } = viewsHandler(this)
    if (error) return this.logger.error(error)
  }

  /* ==============================
  *  SET trust proxy IF ANY
  ============================== */
  if (proxyRules) {
    const { error } = trustProxies({
      trustRules: proxyRules,
      server: this.server
    })
    if (error) return this.logger.error(error)
  }

  /* ==============================
  *  APPLY Security
  ============================== */
  securityGuard({
    server: this.server,
    rules: security || {}
  })

  /* ==============================
  *  MIDDLEWARE HANDLING
  ============================== */
  {
    const { error } = middlewareHandler({
      server: this.server,
      drawer: this.drawer,
      middleware: middleware || [],
      setLogger: httpRequestsLog
    })
    if (error) return this.logger.error(error)
  }

  /* ==============================
  *  ROUTES
  ============================== */
  {
    const { error } = router({ server: this.server, drawer: this.drawer, routes })
    if (error) return this.logger.error(error)
  }

  this.attend = () => {
    return new Promise((resolve, reject) => {
      const onListening = () => {
        const MSG_DIVISION = '----------------------------------------'
        const RUNNING_MSG = chalk.green(`${MSG_DIVISION}\n${this.name} is serving on port ${this.port}`)
        this.logger.log(RUNNING_MSG)
        resolve(this.drawer)
      }

      try {
        const serving = this.server.listen(port, onListening)
        this.close = () => serving.close()
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = Spacehorn
