'use strict';

var chalk = require('chalk');

var g = chalk.green,
    y = chalk.yellow,
    r = chalk.red;

// Some string utils

var division = '----------------------------------------';

var constants = {
	info: {
		APP_RUNNING: function APP_RUNNING(appName, port) {
			return g(division + '\n' + appName + ' is serving on port ' + port);
		}
	},
	error: {
		VIEWS_ENGINE_NEEDED: function VIEWS_ENGINE_NEEDED(appName) {
			return r('"viewsEngine" must be specified in ' + appName + ' config when using "viewsDir"');
		},
		INCOMPLETE_TEMPLATE_ENGINE: function INCOMPLETE_TEMPLATE_ENGINE(appName) {
			return r(appName + ' custom template engine needs both "ext" and "engineFunc"');
		},
		MIDDLEWARE_NOT_ARRAY: function MIDDLEWARE_NOT_ARRAY(appName) {
			return r('Middelware for ' + appName + ' must be an Array');
		},
		ROUTES_IS_NOT_ARRAY: function ROUTES_IS_NOT_ARRAY(appName, type) {
			return r('The routes for ' + appName + ' must be passed as an Array, got ' + type + ' instead');
		},
		NO_ROUTES: function NO_ROUTES(appName) {
			return r('Forgot to add routes? At least one route is needed for ' + appName);
		},
		EXTEND_DRAWER_NOT_OBJECT: function EXTEND_DRAWER_NOT_OBJECT(appName, type) {
			return r('"extendDrawer" passed to ' + appName + ' must be a key-value Object, got ' + type + ' instead');
		}
	},
	warning: {
		FIX_ERRORS_FIRST: function FIX_ERRORS_FIRST(appName) {
			return y('Errors need to be attended before ' + appName + ' starts to serve');
		}
	}
};

module.exports = constants;