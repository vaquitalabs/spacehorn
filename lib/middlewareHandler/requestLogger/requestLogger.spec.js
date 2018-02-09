/* global describe, it */
const { expect } = require('chai')
const requestLogger = require('./requestLogger')

const drawerMock = {
  logger: {
    info () {}
  }
}

const reqMock = {
  method: 'GET',
  get () {},
  originalUrl: 'url'
}

const nextMock = {
  f () {}
}

describe('requestLogger', function () {
  describe('When called', function () {
    describe('When req has body', function () {
      it('should get logger from drawer and display all info', function () {
        const spyInfo = this.sandbox.spy(drawerMock.logger, 'info')
        const spyNext = this.sandbox.spy(nextMock, 'f')
        const req = Object.assign({}, reqMock, { body: {} })
        requestLogger(drawerMock, req, null, nextMock.f)
        expect(spyInfo.calledTwice).to.equal(true)
        expect(spyNext.calledOnce).to.equal(true)
      })
    })

    describe('When req does NOT have body', function () {
      it('should get logger from drawer and display only basic request info', function () {
        const spyInfo = this.sandbox.spy(drawerMock.logger, 'info')
        const spyNext = this.sandbox.spy(nextMock, 'f')
        requestLogger(drawerMock, reqMock, null, nextMock.f)
        expect(spyInfo.calledOnce).to.equal(true)
        expect(spyNext.calledOnce).to.equal(true)
      })
    })
  })
})
