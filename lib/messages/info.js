const chalk = require('chalk')
const c = chalk.green
const division = '----------------------------------------';

const infoMessages = {
  APP_RUNNING: (appName, port) => c(`${division}\n${appName} is serving on port ${port}`),
}

module.exports = infoMessages
