'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = _chalk2.default.red;

var errorMessages = {
  VIEWS_ENGINE_NEEDED: function VIEWS_ENGINE_NEEDED(appName) {
    return c('"viewsEngine" must be specified in ' + appName + ' config when using "viewsDir"');
  },
  INCOMPLETE_TEMPLATE_ENGINE: function INCOMPLETE_TEMPLATE_ENGINE(appName) {
    return c(appName + ' custom template engine needs both "ext" and "engineFunc"');
  },
  MIDDLEWARE_NOT_ARRAY: function MIDDLEWARE_NOT_ARRAY(appName) {
    return c('Middelware for ' + appName + ' must be an Array');
  },
  ROUTES_IS_NOT_ARRAY: function ROUTES_IS_NOT_ARRAY(appName, type) {
    return c('The routes for ' + appName + ' must be passed as an Array, got ' + type + ' instead');
  },
  ROUTE_MISSING_PATH: function ROUTE_MISSING_PATH(appName) {
    return c('There is a route for ' + appName + ' that is missing the required "path"');
  },
  ROUTE_MISSING_EXEC: function ROUTE_MISSING_EXEC(appName) {
    return c('There is a route for ' + appName + ' that is missing the required "exec" function');
  },
  NO_ROUTES: function NO_ROUTES(appName) {
    return c('Forgot to add routes? At least one route is needed for ' + appName);
  },
  EXTEND_DRAWER_NOT_OBJECT: function EXTEND_DRAWER_NOT_OBJECT(appName, type) {
    return c('"extendDrawer" passed to ' + appName + ' must be a key-value Object, got ' + type + ' instead');
  },
  READY_HOOK_NOT_FUNCTION: function READY_HOOK_NOT_FUNCTION(appName, type) {
    return c('"onReady" passed to ' + appName + ' must be a Function, got ' + type + ' instead');
  }
};

module.exports = errorMessages;