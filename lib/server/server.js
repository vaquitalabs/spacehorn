const bodyParser = require('body-parser')
const express = require('express')

function server ({ name, publicDir }) {
  const app = express()
  app.appName = name

  /* ==============================
  *  PARSE Json & Url Encoded
  ============================== */
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  /* ==============================
  *  STATIC ASSETS : if publicDir set
  ============================== */
  if (publicDir) {
    app.use(express.static(publicDir))
  }

  return app
}

module.exports = server
