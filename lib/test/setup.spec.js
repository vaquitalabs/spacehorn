/* global before, beforeEach, afterEach */
const sinon = require('sinon')
const chai = require('chai')
const chaiHttp = require('chai-http')

before(function () {
  chai.use(chaiHttp)
})

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})
