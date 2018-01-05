#!/usr/bin/env node

const program = require('./program')
const archs = require('./archs')
const controllers = require('./controllers')

if (program.arch) {
  archs.build(program.arch)
}
if (program.controller) {
  controllers.build(program.controller, program.controllerName)
}
