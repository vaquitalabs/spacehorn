'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _error = require('./messages/error');

function applyMiddleware(app, drawer, middleware) {
	if (middleware.constructor === Array) {
		var _loop = function _loop(i) {
			app.use(function (req, res, next) {
				middleware[i](drawer, req, res, next);
			});
		};

		for (var i = 0; i < middleware.length; i++) {
			_loop(i);
		}
	} else {
		throw new Error((0, _error.MIDDLEWARE_NOT_ARRAY)(app.appName));
	}
}

exports.default = applyMiddleware;