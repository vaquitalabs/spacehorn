/*
 * Import Dependencies
 */
import axios from 'axios'
import exoServer from './server'
import securityGuard  from './security'
import applyMiddleware from './applyMiddleware'
import router from './router'

import { NO_ROUTES, EXTEND_DRAWER_NOT_OBJECT } from './messages/error'
import { FIX_ERRORS_FIRST } from './messages/warn'
import { APP_RUNNING } from './messages/info'

/* ==============================
*	Start Spacehorn
============================== */
function Spacehorn(config) {
	const { 
		publicDir,
		middleware,
		db,
		routes,
		viewsDir,
		viewsEngine,
		extendDrawer
	} = config

	let {
		name,
		port,
		logger,
		security
	} = config

	let executionError = false

	/* ==============================
	*	DEFINE name
	============================== */
	if (!name) name = 'Spacehorn App'

	/* ==============================
	*	DEFINE port
	============================== */
	if (!port) port = 3000

	/* ==============================
	*	DEFINE logger
	============================== */
	if (!logger) logger = console

	/* ==============================
	*	DEFINE initial drawer
	============================== */
	let exoDrawer = { http: axios }
	
	if (db) exoDrawer.db = db

	/* ==============================
	*	EXTEND drawer
	============================== */
	if (extendDrawer) {
		if (extendDrawer.constructor === Object) {
			exoDrawer = { ...exoDrawer, ...extendDrawer }
		}
		else {
			executionError = true
			logger.error(EXTEND_DRAWER_NOT_OBJECT(name, extendDrawer.constructor.name))
		}
	}
	
	/* ==============================
	*	DECLARE exoServer
	============================== */
	const server = exoServer({
		name,
		publicDir,
		viewsDir,
		viewsEngine,
		logger
	})

	/* ==============================
	*	APPLY Security
	============================== */
	security = security || {}
	securityGuard(server, security)

	/* ==============================
	*	MIDDLEWARE : if middleware
	============================== */
	if (middleware) {
		try {
			applyMiddleware(server, exoDrawer, middleware)
		}
		catch(err) {
			executionError = true
			logger.error(err)
		}
	}

	/* ==============================
	*	ROUTES : if routes
	============================== */
	if (!routes) {
		executionError = true
		logger.error(NO_ROUTES(name))
	}
	else {
		try {
			router(server, exoDrawer, routes)
		}
		catch(err) {
			executionError = true
			logger.error(err)
		}
	}

	this.attend = () => {
		if (executionError)
			return logger.warn(FIX_ERRORS_FIRST(name))

		server.listen(port, () => {
			logger.log(APP_RUNNING(name, port))
		})
	}
}

module.exports = Spacehorn
