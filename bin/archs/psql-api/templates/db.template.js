let template = ''

template += `require('dotenv').config()\n`
template += `const Sequelize = require('sequelize')\n`
template += `const models = require('./../models')\n`
template += `const associations = require('./../models/associations')\n`
template += `const {\n`
template += `  DB_HOST,\n`
template += `  DB_NAME,\n`
template += `  DB_USERNAME,\n`
template += `  DB_PASSWORD,\n`
template += `} = process.env`
template += `\n\n`
template += `const dbModelsReady = {}\n`
template += `const timestampsConfig = {\n`
template += `  timestamps: true,\n`
template += `  underscored: true,\n`
template += `}`
template += `\n\n`
template += `const dbUri = \`postgres://\${DB_USERNAME}:\${DB_PASSWORD}@\${DB_HOST}:5432/\${DB_NAME}\`\n`
template += `const sequelize = new Sequelize(dbUri)`
template += `\n\n`
template += `models.forEach(model => {\n`
template += `  dbModelsReady[model.id] = sequelize.define(...model, timestampsConfig)\n`
template += `})`
template += `\n\n`
template += `associations.forEach(asstn => {\n`
template += `  dbModelsReady[asstn.modelA][asstn.association](dbModelsReady[asstn.modelB], asstn.byAttrs)\n`
template += `})`
template += `\n\n`
template += `for (const model in dbModelsReady) {\n`
template += `  dbModelsReady[model].sync()\n`
template += `}`
template += `\n\n`
template += `module.exports = dbModelsReady\n`

module.exports = template
