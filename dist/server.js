'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _manageViews = require('./manageViews');

var _manageViews2 = _interopRequireDefault(_manageViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exoServer(serverConfig) {
  var name = serverConfig.name,
      publicDir = serverConfig.publicDir,
      viewsDir = serverConfig.viewsDir,
      viewsEngine = serverConfig.viewsEngine,
      logger = serverConfig.logger;


  var app = (0, _express2.default)();
  app.appName = name;

  /* ==============================
  *  PARSE Json & Url Encoded
  ============================== */
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());

  /* ==============================
  *  STATIC ASSETS : if publicDir set
  ============================== */
  if (publicDir) app.use(_express2.default.static(publicDir));

  /* ==============================
  *  VIEWS : if viewsDir
  ============================== */
  if (viewsDir) {
    try {
      (0, _manageViews2.default)(app, viewsDir, viewsEngine);
    } catch (err) {
      logger.error(err);
    }
  }

  return app;
}

exports.default = exoServer;