/* global beforeEach, describe, it */
const { expect } = require('chai')
const security = require('./security')

const serverMock = {
  use () {}
}

describe('security', function () {
  describe('When no security rules passed', function () {
    it('must apply default rules', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      const rules = {}
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(5)
    })
  })

  describe('When disabling default rules', function () {
    const rules = {}
    let defaultRulesNum = 5

    beforeEach(function () {
      defaultRulesNum -= 1
    })

    it('dnsPrefetchControl, disabling it should execute serverMock.use minus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.dnsPrefetchControl = false
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('hidePoweredBy, disabling it should execute serverMock.use minus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.hidePoweredBy = false
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('ieNoOpen, disabling it should execute serverMock.use minus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.ieNoOpen = false
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('noSniff, disabling it should execute serverMock.use minus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.noSniff = false
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('xssFilter, disabling it should execute serverMock.use minus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.xssFilter = false
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })
  })

  describe('When enabling disabled rules by default', function () {
    const rules = {}
    let defaultRulesNum = 5

    beforeEach(function () {
      defaultRulesNum += 1
    })

    it('useCors, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.cors = true
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('contentSecurityPolicy, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.contentSecurityPolicy = { directives: { defaultSrc: ["'self'"] } }
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('frameguard, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.frameguard = { action: 'sameorigin' }
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('hpkp, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.hpkp = { maxAge: 1000, sha256s: ['AnyPKey', 'ShaKey='] }
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('hsts, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.hsts = { maxAge: 1000 }
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('noCache, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.noCache = true
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })

    it('referrerPolicy, enabling it should execute serverMock.use plus 1', function () {
      const useSpy = this.sandbox.spy(serverMock, 'use')
      rules.referrerPolicy = { policy: 'same-origin' }
      security({ server: serverMock, rules })
      expect(useSpy.callCount).to.equal(defaultRulesNum)
    })
  })
})
