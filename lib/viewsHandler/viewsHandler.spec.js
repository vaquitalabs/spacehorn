/* global describe, it */
const { expect } = require('chai')
const viewsHandler = require('./viewsHandler')

const serverMock = {
  set () {},
  engine () {}
}

describe('viewsHandler', function () {
  describe('When there is no viewsEngine present', function () {
    it('should return the error', function () {
      const result = viewsHandler({ server: serverMock, viewsDir: 'views' })
      expect(result.error).to.be.a('error')
    })
  })

  describe('When viewsEngine is present', function () {
    describe('and viewsEngine is in string format', function () {
      it('should set views and engine directly', function () {
        const setSpy = this.sandbox.spy(serverMock, 'set')
        viewsHandler({ server: serverMock, viewsDir: 'views_dir', viewsEngine: 'jade' })
        expect(setSpy.withArgs('views', 'views_dir').calledOnce).to.equal(true)
        expect(setSpy.withArgs('view engine', 'jade').calledOnce).to.equal(true)
      })
    })

    describe('and viewsEngine is in { ext, engineFunc } format', function () {
      describe('and engine is missing ext', function () {
        it('should return the error', function () {
          const result = viewsHandler({ server: serverMock, viewsDir: 'views', viewsEngine: { engineFunc () {} } })
          expect(result.error).to.be.a('error')
        })
      })

      describe('and engine is missing engineFunc', function () {
        it('should return the error', function () {
          const result = viewsHandler({ server: serverMock, viewsDir: 'views', viewsEngine: { ext: 'pug' } })
          expect(result.error).to.be.a('error')
        })
      })

      describe('and viewsEngine is ok', function () {
        it('should set views and engine directly', function () {
          const setSpy = this.sandbox.spy(serverMock, 'set')
          const engineSpy = this.sandbox.spy(serverMock, 'engine')
          viewsHandler({ server: serverMock, viewsDir: 'views_dir', viewsEngine: { ext: 'pug', engineFunc () {} } })
          expect(setSpy.withArgs('views', 'views_dir').calledOnce).to.equal(true)
          expect(setSpy.withArgs('view engine', 'pug').calledOnce).to.equal(true)
          expect(engineSpy.withArgs('pug').calledOnce).to.equal(true)
        })
      })
    })
  })
})
