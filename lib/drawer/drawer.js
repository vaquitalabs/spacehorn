const axios = require('axios')
const { E_EXTEND_DRAWER_NOT_OBJECT } = require('./../errors')

function drawer ({ logger, db, extendDrawer }) {
  if (extendDrawer && extendDrawer.constructor !== Object) {
    return { error: E_EXTEND_DRAWER_NOT_OBJECT }
  }
  return Object.assign({}, { http: axios, logger, db }, extendDrawer || {})
}

module.exports = drawer
