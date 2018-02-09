const { E_TRUST_PROXIES_NOT_ARRAY } = require('./../errors')

function trustProxies ({ trustRules, server }) {
  if (trustRules.constructor.name !== 'Array') {
    return { error: E_TRUST_PROXIES_NOT_ARRAY }
  }
  trustRules.forEach(proxy => server.set('trust proxy', proxy))
  return { error: null }
}

module.exports = trustProxies
