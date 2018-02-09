/* global describe, it */
const { expect } = require('chai')
const middlewareHandler = require('./middleware')

const serverMock = {
  use () {}
}

describe('middleware', function () {
  describe('When middleware is empty', function () {
    describe('and set logger is false', function () {
      it('should not run any middleware', function () {
        const useSpy = this.sandbox.spy(serverMock, 'use')
        middlewareHandler({ server: serverMock, drawer: {}, middleware: [], setLogger: false })
        expect(useSpy.notCalled).to.equal(true)
      })
    })

    describe('and set logger is not passed', function () {
      it('should set the request logger middleware', function () {
        const useSpy = this.sandbox.spy(serverMock, 'use')
        middlewareHandler({ server: serverMock, drawer: {}, middleware: [] })
        expect(useSpy.calledTwice).to.equal(true)
      })
    })

    describe('and set logger is true', function () {
      it('should set the request logger middleware', function () {
        const useSpy = this.sandbox.spy(serverMock, 'use')
        middlewareHandler({ server: serverMock, drawer: {}, middleware: [], setLogger: true })
        expect(useSpy.calledTwice).to.equal(true)
      })
    })
  })

  describe('When there is middleware present', function () {
    describe('with pure function and { path, run } format', function () {
      it('should "use" all middleware in the proper way', function () {
        const useSpy = this.sandbox.spy(serverMock, 'use')
        const funcA = (req, res, next) => {}
        const funcB = (drawer, req, res, next) => {}
        const funcC = { path: '/', run: funcB }
        const middleware = [funcA, funcB, funcC]
        middlewareHandler({ server: serverMock, drawer: {}, middleware, setLogger: true })
        expect(useSpy.callCount).to.equal(5)
        expect(useSpy.withArgs(funcC.path).calledOnce).to.equal(true)
      })
    })
  })

  describe('When middleware is not array', function () {
    it('should return the error', function () {
      const result = middlewareHandler({ server: serverMock, drawer: {}, middleware: 'a string' })
      expect(result.error).to.be.a('error')
    })
  })
})
