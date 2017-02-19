'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * Import Dependencies
                                                                                                                                                                                                                                                                   */


// import { error, warn, info } from './messages'

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _security = require('./security');

var _security2 = _interopRequireDefault(_security);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _error = require('./messages/error');

var _warn = require('./messages/warn');

var _info = require('./messages/info');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ==============================
*	Start Spacehorn
============================== */
function Spacehorn(config) {
	var publicDir = config.publicDir,
	    middleware = config.middleware,
	    db = config.db,
	    routes = config.routes,
	    viewsDir = config.viewsDir,
	    viewsEngine = config.viewsEngine,
	    extendDrawer = config.extendDrawer;
	var name = config.name,
	    port = config.port,
	    logger = config.logger,
	    security = config.security;


	var executionError = false;

	/* ==============================
 *	DEFINE name
 ============================== */
	if (!name) name = 'Spacehorn App';

	/* ==============================
 *	DEFINE port
 ============================== */
	if (!port) port = 3000;

	/* ==============================
 *	DEFINE logger
 ============================== */
	if (!logger) logger = console;

	/* ==============================
 *	DEFINE initial drawer
 ============================== */
	var exoDrawer = { http: _axios2.default };

	if (db) exoDrawer.db = db;

	/* ==============================
 *	EXTEND drawer
 ============================== */
	if (extendDrawer) {
		if (extendDrawer.constructor === Object) {
			exoDrawer = _extends({}, exoDrawer, extendDrawer);
		} else {
			executionError = true;
			logger.error((0, _error.EXTEND_DRAWER_NOT_OBJECT)(name, extendDrawer.constructor.name));
		}
	}

	/* ==============================
 *	DECLARE exoServer
 ============================== */
	var server = (0, _server2.default)({
		name: name,
		publicDir: publicDir,
		viewsDir: viewsDir,
		viewsEngine: viewsEngine,
		logger: logger
	});

	/* ==============================
 *	APPLY Security
 ============================== */
	security = security || {};
	(0, _security2.default)(server, security);

	/* ==============================
 *	MIDDLEWARE : if middleware
 ============================== */
	if (middleware) {
		try {
			(0, _applyMiddleware2.default)(server, exoDrawer, middleware);
		} catch (err) {
			executionError = true;
			logger.error(err);
		}
	}

	/* ==============================
 *	ROUTES : if routes
 ============================== */
	if (!routes) {
		executionError = true;
		logger.error((0, _error.NO_ROUTES)(name));
	} else {
		try {
			(0, _router2.default)(server, exoDrawer, routes);
		} catch (err) {
			executionError = true;
			logger.error(err);
		}
	}

	this.attend = function () {
		if (executionError) return logger.warn((0, _warn.FIX_ERRORS_FIRST)(name));

		server.listen(port, function () {
			logger.log((0, _info.APP_RUNNING)(name, port));
		});
	};
}

module.exports = Spacehorn;