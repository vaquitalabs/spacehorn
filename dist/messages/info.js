'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = _chalk2.default.green;
var division = '----------------------------------------';

var infoMessages = {
	APP_RUNNING: function APP_RUNNING(appName, port) {
		return c(division + '\n' + appName + ' is serving on port ' + port);
	}
};

module.exports = infoMessages;