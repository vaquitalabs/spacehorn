/*
 * Import Dependencies
 */
const axios = require('axios')
const exoServer = require('./server')
const securityGuard  = require('./security')
const applyMiddleware = require('./applyMiddleware')
const router = require('./router')

const {
  NO_ROUTES,
  EXTEND_DRAWER_NOT_OBJECT,
  TRUST_PROXIES_NOT_ARRAY,
} = require('./messages/error')

const { FIX_ERRORS_FIRST } = require('./messages/warn')
const { APP_RUNNING } = require('./messages/info')

/* ==============================
*  Start Spacehorn
============================== */
function Spacehorn(config) {
  const {
    publicDir,
    db,
    routes,
    viewsDir,
    viewsEngine,
    extendDrawer,
    trustProxies,
    middleware,
    httpRequestsLog,
  } = config

  let {
    name,
    port,
    logger,
    security,
  } = config

  this.executionError = false

  /* ==============================
  *  DEFINE name
  ============================== */
  if (!name) name = 'Spacehorn App'

  /* ==============================
  *  DEFINE port
  ============================== */
  if (!port) port = 3000

  /* ==============================
  *  DEFINE logger
  ============================== */
  if (!logger) logger = console

  /* ==============================
  *  DEFINE initial drawer
  ============================== */
  let exoDrawer = { http: axios, logger }
  if (db) exoDrawer.db = db

  /* ==============================
  *  EXTEND drawer
  ============================== */
  if (extendDrawer) {
    if (extendDrawer.constructor === Object) {
      exoDrawer = Object.assign({}, exoDrawer, extendDrawer)
    }
    else {
      this.executionError = true
      logger.error(EXTEND_DRAWER_NOT_OBJECT(name, extendDrawer.constructor.name))
    }
  }

  /* ==============================
  *  DECLARE exoServer
  ============================== */
  const server = exoServer({
    name,
    publicDir,
    viewsDir,
    viewsEngine,
    logger,
  })

  /* ==============================
  *  SET trust proxy IF ANY
  ============================== */
  if (trustProxies) {
    if (trustProxies.constructor.name === 'Array') {
      trustProxies.forEach(proxy => {
        server.set('trust proxy', proxy)
      })
    } else {
      this.executionError = true
      logger.error(TRUST_PROXIES_NOT_ARRAY(name, trustProxies.constructor.name))
    }
  }

  /* ==============================
  *  APPLY Security
  ============================== */
  security = security || {}
  securityGuard(server, security)

  /* ==============================
  *  MIDDLEWARE : if middleware
  *  & SET http requests logging middleware
  ============================== */

  if (middleware) {
    let setLogger = false
    if (httpRequestsLog || httpRequestsLog === undefined) setLogger = true
    try {
      applyMiddleware(server, exoDrawer, middleware, setLogger)
    }
    catch(err) {
      this.executionError = true
      logger.error(err)
    }
  }

  /* ==============================
  *  ROUTES : if routes
  ============================== */
  if (!routes) {
    this.executionError = true
    logger.error(NO_ROUTES(name))
  }
  else {
    try {
      router(server, exoDrawer, routes)
    }
    catch(err) {
      this.executionError = true
      logger.error(err)
    }
  }

  /* ==============================
  *  ASSIGN PROPS
  ============================== */
  this.name = name
  this.port = port
  this.publicDir = publicDir
  this.viewsDir = viewsDir
  this.viewsEngine = viewsEngine
  this.server = server

  /* ==============================
  *  CLOSE METHOD
  ============================== */
  this.close = () => {
    this.server.close()
  }

  /* ==============================
  *  ATTEND METHOD
  ============================== */
  this.attend = () => {
    return new Promise((resolve, reject) => {
      if (this.executionError) {
        const msg = FIX_ERRORS_FIRST(name)
        logger.error(msg)
        return reject(msg)
      }
      this.server.listen(port, () => {
        logger.log(APP_RUNNING(name, port))
        resolve(exoDrawer)
      })
    })
  }
}

module.exports = Spacehorn
