'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function securityGuard(app, rules) {
  var useCors = rules.cors,
      contentSecurityPolicy = rules.contentSecurityPolicy,
      dnsPrefetchControl = rules.dnsPrefetchControl,
      frameguard = rules.frameguard,
      hidePoweredBy = rules.hidePoweredBy,
      hpkp = rules.hpkp,
      hsts = rules.hsts,
      ieNoOpen = rules.ieNoOpen,
      noCache = rules.noCache,
      noSniff = rules.noSniff,
      referrerPolicy = rules.referrerPolicy,
      xssFilter = rules.xssFilter;

  /* ========================
  * DNS Prefetch Control
  * Default - Prefetch Disabled (allow: false)
  =========================*/

  if (dnsPrefetchControl === undefined || dnsPrefetchControl) app.use(_helmet2.default.dnsPrefetchControl({ allow: false }));

  /* ========================
  * Hide Powered By
  * Default - Applied
  =========================*/
  if (hidePoweredBy === undefined || hidePoweredBy) app.use(_helmet2.default.hidePoweredBy());

  /* ========================
  * IE No Open
  * Default - Applied
  =========================*/
  if (ieNoOpen === undefined || ieNoOpen) app.use(_helmet2.default.ieNoOpen());

  /* ========================
  * No Sniff
  * Default - Applied
  =========================*/
  if (noSniff === undefined || noSniff) app.use(_helmet2.default.noSniff());

  /* ========================
  * XSS Filter
  * Default - Applied
  =========================*/
  if (xssFilter === undefined || xssFilter) app.use(_helmet2.default.xssFilter());

  /* ========================
  * Content Security Policy
  * Default - Not applied
  =========================*/
  if (useCors) app.use((0, _cors2.default)());

  /* ========================
  * Content Security Policy
  * Default - Not applied
  =========================*/
  if (contentSecurityPolicy) app.use(_helmet2.default.contentSecurityPolicy(contentSecurityPolicy));

  /* ========================
  * Frameguard
  * Default - Not applied
  =========================*/
  if (frameguard) app.use(_helmet2.default.frameguard(frameguard));

  /* ========================
  * HTTP Public Key Pinning
  * Default - Not applied
  =========================*/
  if (hpkp) app.use(_helmet2.default.hpkp(hpkp));

  /* ========================
  * Strict Transport Security
  * Default - Not applied
  =========================*/
  if (hsts) app.use(_helmet2.default.hsts(hsts));

  /* ========================
  * No Cache
  * Default - Not applied
  =========================*/
  if (noCache) app.use(_helmet2.default.noCache());

  /* ========================
  * Referrer Policy
  * Default - Not applied
  =========================*/
  if (referrerPolicy) app.use(_helmet2.default.referrerPolicy(referrerPolicy));
}

exports.default = securityGuard;