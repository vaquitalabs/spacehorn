#!/usr/bin/env node

const program = require('./program')
const archs = require('./archs')

if (program.arch) {
  archs.build(program.arch)
}
