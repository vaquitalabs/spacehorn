let template = ''

template += `require('dotenv').config()\n`
template += `const path = require('path')\n`
template += `const Spacehorn = require('spacehorn')\n`
template += `const SpacehornRouter = require('spacehorn-router')\n`
template += `const routes = require('./../routes')\n`
template += `const db = require('./../db')\n`
template += `\n\n`
template += `const API = new Spacehorn({\n`
template += `  name: 'Spacehorn API',\n`
template += `  port: process.env.PORT,\n`
template += `  routes: SpacehornRouter({ routes, controllersPath: path.join(__dirname, '..', 'controllers') }),\n`
template += `  db,\n`
template += `  trustProxies: [1],\n`
template += `})\n`
template += `\n\n`
template += `module.exports = API\n`

module.exports = template
