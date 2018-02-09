/* global describe, it */
const { expect } = require('chai')
const drawer = require('./drawer')

describe('drawer', function () {
  describe('When no params are passed', function () {
    it('should return a drawer with only the http client', function () {
      const d = drawer({})
      expect(d.http).to.be.a('function')
    })
  })

  describe('When possible params are passed', function () {
    it('should return a drawer including passed args', function () {
      const d = drawer({ logger: {}, db: {}, extendDrawer: { a: 1 } })
      expect(d.logger).to.be.a('object')
      expect(d.logger).to.be.a('object')
      expect(d.a).to.equal(1)
    })
  })

  describe('When extendDrawer is not an object', function () {
    it('should return the error', function () {
      const d = drawer({ extendDrawer: 'a string' })
      expect(d.error).to.be.a('error')
    })
  })
})
