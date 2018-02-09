/* global describe, it */
const chai = require('chai')
const Spacehorn = require('./spacehorn')
const { expect } = chai

// Complete Integration Test

describe('spacehorn', function () {
  describe('When there is an error on any module', function () {
    it('should stop the process and log the error', function () {
      const logStub = this.sandbox.stub(console, 'error')
      const app = new Spacehorn({ name: 'app name', extendDrawer: 'must be object' }) // eslint-disable-line
      expect(logStub.calledOnce).to.equal(true)
    })
  })

  describe('attend', function () {
    describe('When passing all config options and starting to attend', function () {
      it('should run OK and log the running message', function (done) {
        const logStub = this.sandbox.stub(console, 'log')
        const app = new Spacehorn({
          name: 'app name',
          port: 3100,
          routes: [
            {
              path: '/',
              method: 'get',
              exec (drawer, req, res) {}
            }
          ],
          publicDir: '/public',
          viewsDir: '/views',
          viewsEngine: 'pug',
          trustProxies: [1],
          extendDrawer: { anything: 'hello' }
        })
        const onResolve = () => {
          expect(logStub.calledOnce).to.equal(true)
          expect(app.name).to.equal('app name')
          expect(app.drawer.anything).to.equal('hello')
          app.close()
          done()
        }
        app.attend().then(onResolve)
      })
    })

    describe('When doing a call to the endpoint', function () {
      it('should run OK and log the running message', function (done) {
        this.sandbox.stub(console, 'log')
        const app = new Spacehorn({
          name: 'app name',
          port: 3100,
          routes: [
            {
              path: '/',
              method: 'get',
              exec (drawer, req, res) { res.json({ greeting: 'endpoint hello' }) }
            }
          ],
          publicDir: '/public',
          viewsDir: '/views',
          viewsEngine: 'pug',
          middleware: [ (drawer, req, res, next) => { next() } ],
          trustProxies: [1],
          extendDrawer: { anything: 'hello' },
          httpRequestsLog: false
        })
        app.attend()
          .then(() => {
            return chai.request('http://localhost:3100').get('/')
          }).then(res => {
            expect(res).to.have.status(200)
            app.close()
            done()
          })
      })
    })
  })
})
