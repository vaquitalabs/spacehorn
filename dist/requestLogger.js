'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestLogger = function requestLogger(drawer, req, res, next) {
  var logger = drawer.logger;

  logger.info(req.method + ' ' + req.get('host') + req.originalUrl);
  if (req.body) logger.info('' + JSON.stringify(req.body));
  next();
};

exports.default = requestLogger;