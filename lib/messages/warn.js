import chalk from 'chalk'

const c = chalk.yellow

const warnMessages = {
  FIX_ERRORS_FIRST: (appName) => c(`Errors need to be attended before ${appName} starts to serve`),
}

module.exports = warnMessages
