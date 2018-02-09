/* global describe, it */
const { expect } = require('chai')
const router = require('./router')

const serverMock = {
  get () {},
  post () {},
  put () {},
  delete () {}
}

describe('router', function () {
  describe('When there are no routes', function () {
    it('should return the error', function () {
      const result = router({})
      expect(result.error).to.be.a('error')
    })
  })

  describe('When passing routes', function () {
    describe('and routes are NOT an array', function () {
      it('should return the error', function () {
        const result = router({ routes: 'a string' })
        expect(result.error).to.be.a('error')
      })
    })

    describe('and a route is missing path', function () {
      it('should return the error', function () {
        const routes = [
          { view: 'any.html', exec () {} }
        ]
        const result = router({ routes })
        expect(result.error).to.be.a('error')
      })
    })

    describe('and a route is missing exec function', function () {
      it('should return the error', function () {
        const routes = [
          { path: '/', view: 'any.html' }
        ]
        const result = router({ routes })
        expect(result.error).to.be.a('error')
      })
    })

    describe('and a route does not provide the method', function () {
      it('should add GET method by default to the route and set the server method', function () {
        const getSpy = this.sandbox.spy(serverMock, 'get')
        const routes = [
          { path: '/', view: 'any.html', exec () {} }
        ]
        router({ server: serverMock, drawer: {}, routes })
        expect(getSpy.withArgs('/').calledOnce).to.equal(true)
      })
    })

    describe('with many routes and different methods', function () {
      it('should set the server method for every route', function () {
        const getSpy = this.sandbox.spy(serverMock, 'get')
        const postSpy = this.sandbox.spy(serverMock, 'post')
        const putSpy = this.sandbox.spy(serverMock, 'put')
        const deleteSpy = this.sandbox.spy(serverMock, 'delete')
        const routes = [
          { path: '/', view: 'any.html', exec () {} },
          { path: '/', method: 'post', view: 'any.html', exec () {} },
          { path: '/', method: 'put', view: 'any.html', exec () {} },
          { path: '/', method: 'delete', view: 'any.html', exec () {} }
        ]
        router({ server: serverMock, drawer: {}, routes })
        expect(getSpy.withArgs('/').calledOnce).to.equal(true)
        expect(postSpy.withArgs('/').calledOnce).to.equal(true)
        expect(putSpy.withArgs('/').calledOnce).to.equal(true)
        expect(deleteSpy.withArgs('/').calledOnce).to.equal(true)
      })
    })
  })
})
