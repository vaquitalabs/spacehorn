const createController = require('./../createController')
const template = require('./../templates/common-controller.template.js')

const parseTemplate = name => template.replace('{{name}}', name)

module.exports = (group, name) => createController(name, parseTemplate(name), group)
