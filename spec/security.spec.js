/* eslint-env node, jest */
const securityGuard = require('./../lib/security')

const app = {
  appName: 'Test App',
  use: jest.fn(),
}

describe('security', () => {
  test('When no security rules passed, must apply default rules', () => {
    const rules = {}
    securityGuard(app, rules)
    expect(app.use).toHaveBeenCalledTimes(5)
  })

  describe('When disabling default rules', () => {
    const rules = {}
    let defaultRulesNum = 5

    beforeEach(() => {
      defaultRulesNum -= 1
      app.use.mockReset() // reset mock to use ...CalledTimes from ground
    })

    test('dnsPrefetchControl, disabling it should execute app.use minus 1', () => {
      rules.dnsPrefetchControl = false
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('hidePoweredBy, disabling it should execute app.use minus 1', () => {
      rules.hidePoweredBy = false
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('ieNoOpen, disabling it should execute app.use minus 1', () => {
      rules.ieNoOpen = false
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('noSniff, disabling it should execute app.use minus 1', () => {
      rules.noSniff = false
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('xssFilter, disabling it should execute app.use minus 1', () => {
      rules.xssFilter = false
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })
  })

  describe('When enabling disabled rules by default', () => {
    const rules = {}
    let defaultRulesNum = 5

    beforeEach(() => {
      defaultRulesNum += 1
      app.use.mockReset() // reset mock to use ...CalledTimes from ground
    })

    test('useCors, enabling it should execute app.use plus 1', () => {
      rules.cors = true
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('contentSecurityPolicy, enabling it should execute app.use plus 1', () => {
      rules.contentSecurityPolicy = { directives: { defaultSrc: ["'self'"] } }
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('frameguard, enabling it should execute app.use plus 1', () => {
      rules.frameguard = { action: 'sameorigin' }
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('hpkp, enabling it should execute app.use plus 1', () => {
      rules.hpkp = { maxAge: 1000, sha256s: ['AnyPKey', 'ShaKey='] }
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('hsts, enabling it should execute app.use plus 1', () => {
      rules.hsts = { maxAge: 1000 }
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('noCache, enabling it should execute app.use plus 1', () => {
      rules.noCache = true
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })

    test('referrerPolicy, enabling it should execute app.use plus 1', () => {
      rules.referrerPolicy = { policy: 'same-origin' }
      securityGuard(app, rules)
      expect(app.use).toHaveBeenCalledTimes(defaultRulesNum)
    })
  })
})
