/*
 * Import Dependencies
 */
import axios from 'axios'
import exoServer from './server'
import securityGuard  from './security'
import applyMiddleware from './applyMiddleware'
import router from './router'

import { NO_ROUTES, EXTEND_DRAWER_NOT_OBJECT, READY_HOOK_NOT_FUNCTION } from './messages/error'
import { FIX_ERRORS_FIRST } from './messages/warn'
import { APP_RUNNING } from './messages/info'

/* ==============================
*  Start Spacehorn
============================== */
function Spacehorn(config) {
  const {
    publicDir,
    middleware,
    db,
    routes,
    viewsDir,
    viewsEngine,
    extendDrawer,
    onReady,
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
      exoDrawer = { ...exoDrawer, ...extendDrawer }
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
  *  APPLY Security
  ============================== */
  security = security || {}
  securityGuard(server, security)

  /* ==============================
  *  MIDDLEWARE : if middleware
  ============================== */
  if (middleware) {
    try {
      applyMiddleware(server, exoDrawer, middleware)
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
  *  LISTEN METHOD
  ============================== */
  this.listen = (onReady) => {
    this.server.listen(port, () => {
      logger.log(APP_RUNNING(name, port))
      if (onReady) onReady(exoDrawer)
    })
  }

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
    if (this.executionError)
      return logger.warn(FIX_ERRORS_FIRST(name))

    if (onReady) {
      if (onReady.constructor === Function) {
        this.listen(onReady)
      }
      else {
        this.executionError = true
        return logger.error(READY_HOOK_NOT_FUNCTION(name, onReady.constructor.name))
      }
    }
    else {
      this.listen()
    }
  }
}

module.exports = Spacehorn
