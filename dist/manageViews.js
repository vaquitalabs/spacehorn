'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _error = require('./messages/error');

function manageViews(app, viewsDir, viewsEngine) {

	if (!viewsEngine) {
		throw new Error((0, _error.VIEWS_ENGINE_NEEDED)(app.appName));
	} else {

		app.set('views', viewsDir);

		if (viewsEngine.constructor === String) app.set('view engine', viewsEngine);

		if (viewsEngine.constructor === Object) {
			var ext = viewsEngine.ext,
			    engineFunc = viewsEngine.engineFunc;


			if (!ext || !engineFunc) {
				throw new Error((0, _error.INCOMPLETE_TEMPLATE_ENGINE)(app.appName));
			} else {
				app.engine(ext, engineFunc);
				app.set('view engine', viewsEngine);
			}
		}
	}
}

exports.default = manageViews;