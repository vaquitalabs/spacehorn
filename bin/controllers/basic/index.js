const createController = require('./../createController')
const template = require('./../templates/common-controller.template.js')
const types = ['get', 'post', 'patch', 'put', 'delete']

const parseTemplate = name => template.replace('{{name}}', name)

module.exports = group => types.forEach(t => { createController(t, parseTemplate(t), group) })
