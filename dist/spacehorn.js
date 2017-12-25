'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * Import Dependencies
                                                                                                                                                                                                                                                                   */


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
*  Start Spacehorn
============================== */
function Spacehorn(config) {
  var _this = this;

  var publicDir = config.publicDir,
      db = config.db,
      routes = config.routes,
      viewsDir = config.viewsDir,
      viewsEngine = config.viewsEngine,
      extendDrawer = config.extendDrawer,
      trustProxies = config.trustProxies,
      middleware = config.middleware,
      httpRequestsLog = config.httpRequestsLog;
  var name = config.name,
      port = config.port,
      logger = config.logger,
      security = config.security;


  this.executionError = false;

  /* ==============================
  *  DEFINE name
  ============================== */
  if (!name) name = 'Spacehorn App';

  /* ==============================
  *  DEFINE port
  ============================== */
  if (!port) port = 3000;

  /* ==============================
  *  DEFINE logger
  ============================== */
  if (!logger) logger = console;

  /* ==============================
  *  DEFINE initial drawer
  ============================== */
  var exoDrawer = { http: _axios2.default, logger: logger };
  if (db) exoDrawer.db = db;

  /* ==============================
  *  EXTEND drawer
  ============================== */
  if (extendDrawer) {
    if (extendDrawer.constructor === Object) {
      exoDrawer = _extends({}, exoDrawer, extendDrawer);
    } else {
      this.executionError = true;
      logger.error((0, _error.EXTEND_DRAWER_NOT_OBJECT)(name, extendDrawer.constructor.name));
    }
  }

  /* ==============================
  *  DECLARE exoServer
  ============================== */
  var server = (0, _server2.default)({
    name: name,
    publicDir: publicDir,
    viewsDir: viewsDir,
    viewsEngine: viewsEngine,
    logger: logger
  });

  /* ==============================
  *  SET trust proxy IF ANY
  ============================== */
  if (trustProxies) {
    if (trustProxies.constructor.name === 'Array') {
      trustProxies.forEach(function (proxy) {
        server.set('trust proxy', proxy);
      });
    } else {
      this.executionError = true;
      logger.error((0, _error.TRUST_PROXIES_NOT_ARRAY)(name, trustProxies.constructor.name));
    }
  }

  /* ==============================
  *  APPLY Security
  ============================== */
  security = security || {};
  (0, _security2.default)(server, security);

  /* ==============================
  *  MIDDLEWARE : if middleware
  *  & SET http requests logging middleware
  ============================== */

  if (middleware) {
    var setLogger = false;
    if (httpRequestsLog || httpRequestsLog === undefined) setLogger = true;
    try {
      (0, _applyMiddleware2.default)(server, exoDrawer, middleware, setLogger);
    } catch (err) {
      this.executionError = true;
      logger.error(err);
    }
  }

  /* ==============================
  *  ROUTES : if routes
  ============================== */
  if (!routes) {
    this.executionError = true;
    logger.error((0, _error.NO_ROUTES)(name));
  } else {
    try {
      (0, _router2.default)(server, exoDrawer, routes);
    } catch (err) {
      this.executionError = true;
      logger.error(err);
    }
  }

  /* ==============================
  *  ASSIGN PROPS
  ============================== */
  this.name = name;
  this.port = port;
  this.publicDir = publicDir;
  this.viewsDir = viewsDir;
  this.viewsEngine = viewsEngine;
  this.server = server;

  /* ==============================
  *  CLOSE METHOD
  ============================== */
  this.close = function () {
    _this.server.close();
  };

  /* ==============================
  *  ATTEND METHOD
  ============================== */
  this.attend = function () {
    return new Promise(function (resolve, reject) {
      if (_this.executionError) {
        var msg = (0, _warn.FIX_ERRORS_FIRST)(name);
        logger.error(msg);
        return reject(msg);
      }
      _this.server.listen(port, function () {
        logger.log((0, _info.APP_RUNNING)(name, port));
        resolve(exoDrawer);
      });
    });
  };
}

module.exports = Spacehorn;