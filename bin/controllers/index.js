const controller = {}

const preBuilds = {
  'basic': require('./basic'),
  'single': require('./single'),
}

controller.build = (group, name) => {
  if (!name) return preBuilds.basic(group)
  preBuilds.single(group, name)
}

module.exports = controller
