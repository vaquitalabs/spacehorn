'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var c = _chalk2.default.yellow;

var warnMessages = {
  FIX_ERRORS_FIRST: function FIX_ERRORS_FIRST(appName) {
    return c('Errors need to be attended before ' + appName + ' starts to serve');
  }
};

module.exports = warnMessages;