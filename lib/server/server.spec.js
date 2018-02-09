/* global describe, it */
const { expect } = require('chai')
const express = require('express')
const server = require('./server')

describe('server', function () {
  describe('On call without publicDir', function () {
    it('should set body parser capabilities and return a server without adding the static dir', function () {
      const exstaticStub = this.sandbox.stub(express, 'static')
      const s = server({ name: 'server name' })
      expect(s.appName).to.equal('server name')
      expect(exstaticStub.notCalled).to.equal(true)
    })
  })

  describe('On call with publicDir', function () {
    it('should set the static dir', function () {
      const staticStub = this.sandbox.stub(express, 'static').callsFake(() => (req, res, next) => { next() })
      server({ name: 'server name', publicDir: '/static' })
      expect(staticStub.calledOnce).to.equal(true)
    })
  })
})
