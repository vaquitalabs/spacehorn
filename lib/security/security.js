const cors = require('cors')
const helmet = require('helmet')

function security ({ server, rules }) {
  const {
    cors: useCors,
    contentSecurityPolicy,
    dnsPrefetchControl,
    frameguard,
    hidePoweredBy,
    hpkp,
    hsts,
    ieNoOpen,
    noCache,
    noSniff,
    referrerPolicy,
    xssFilter
  } = rules

  /* ========================
  * DNS Prefetch Control
  * Default - Prefetch Disabled (allow: false)
  ========================= */
  if (dnsPrefetchControl === undefined || dnsPrefetchControl) {
    server.use(helmet.dnsPrefetchControl({ allow: false }))
  }

  /* ========================
  * Hide Powered By
  * Default - Applied
  ========================= */
  if (hidePoweredBy === undefined || hidePoweredBy) {
    server.use(helmet.hidePoweredBy())
  }

  /* ========================
  * IE No Open
  * Default - Applied
  ========================= */
  if (ieNoOpen === undefined || ieNoOpen) {
    server.use(helmet.ieNoOpen())
  }

  /* ========================
  * No Sniff
  * Default - Applied
  ========================= */
  if (noSniff === undefined || noSniff) {
    server.use(helmet.noSniff())
  }

  /* ========================
  * XSS Filter
  * Default - Applied
  ========================= */
  if (xssFilter === undefined || xssFilter) {
    server.use(helmet.xssFilter())
  }

  /* ========================
  * Content Security Policy
  * Default - Not applied
  ========================= */
  if (useCors) {
    server.use(cors())
  }

  /* ========================
  * Content Security Policy
  * Default - Not applied
  ========================= */
  if (contentSecurityPolicy) {
    server.use(helmet.contentSecurityPolicy(contentSecurityPolicy))
  }

  /* ========================
  * Frameguard
  * Default - Not applied
  ========================= */
  if (frameguard) {
    server.use(helmet.frameguard(frameguard))
  }

  /* ========================
  * HTTP Public Key Pinning
  * Default - Not applied
  ========================= */
  if (hpkp) {
    server.use(helmet.hpkp(hpkp))
  }

  /* ========================
  * Strict Transport Security
  * Default - Not applied
  ========================= */
  if (hsts) {
    server.use(helmet.hsts(hsts))
  }

  /* ========================
  * No Cache
  * Default - Not applied
  ========================= */
  if (noCache) {
    server.use(helmet.noCache())
  }

  /* ========================
  * Referrer Policy
  * Default - Not applied
  ========================= */
  if (referrerPolicy) {
    server.use(helmet.referrerPolicy(referrerPolicy))
  }
}

module.exports = security
