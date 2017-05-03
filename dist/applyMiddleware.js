'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = require('./messages/error');

function applyMiddleware(app, drawer, middleware) {
  if (middleware.constructor === Array) {
    var _loop = function _loop(i) {
      var mddw = middleware[i];
      var mddwFunc = mddw.constructor === Object ? mddw.run : mddw;
      var mddwArgs = mddwFunc.toString().split('{')[0].match(/\(([^)]*)\)/)[1].split(',');
      var mddwReady = mddwFunc;
      var mddwHasDrawer = mddwArgs.length > 3;

      if (mddwHasDrawer) {
        mddwReady = function mddwReady(req, res, next) {
          mddwFunc(drawer, req, res, next);
        };
      }

      if (mddw.constructor === Object) {
        app.use(mddw.path, mddwReady);
      } else {
        app.use(mddwReady);
      }
    };

    for (var i = 0; i < middleware.length; i++) {
      _loop(i);
    }
  } else {
    throw new Error((0, _error.MIDDLEWARE_NOT_ARRAY)(app.appName));
  }
}

exports.default = applyMiddleware;