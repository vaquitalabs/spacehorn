'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _error = require('./messages/error');

function router(app, exoDrawer, routes) {

	if (routes.constructor === Array) {
		var _loop = function _loop(i) {
			var route = routes[i];
			var path = route.path,
			    view = route.view,
			    exec = route.exec;
			var method = route.method;


			method = method.toLowerCase();

			var drawer = _extends({}, exoDrawer, { method: method, path: path, view: view });

			app[method](path, function (req, res) {
				var params = _extends({}, req.params, req.body, req.query);
				drawer.params = params;

				exec(drawer, req, res);
			});
		};

		for (var i = 0; i < routes.length; i++) {
			_loop(i);
		}
	} else {
		throw new Error((0, _error.ROUTES_IS_NOT_ARRAY)(app.appName, routes.constructor.name));
	}
}

exports.default = router;