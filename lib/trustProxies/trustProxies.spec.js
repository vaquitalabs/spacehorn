/* global describe, it */
const { expect } = require('chai')
const trustProxies = require('./trustProxies')

const serverMock = {
  set () {}
}

describe('trustProxies', function () {
  describe('When rules are not an array', function () {
    it('should return an error', function () {
      const result = trustProxies({ trustRules: 'a string', server: serverMock })
      expect(result.error).to.be.a('error')
    })
  })

  describe('When rules are properly passed', function () {
    it('should set trust rules', function () {
      const setSpy = this.sandbox.spy(serverMock, 'set')
      trustProxies({ trustRules: [1, '127.0.0.1'], server: serverMock })
      expect(setSpy.withArgs('trust proxy', 1).calledOnce).to.equal(true)
      expect(setSpy.withArgs('trust proxy', '127.0.0.1').calledOnce).to.equal(true)
    })
  })
})
