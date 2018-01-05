const program = require('commander')

program
  .version('1.0.0')
  .option('--arch [type]', 'Create an empty skeleton architecture')
  .parse(process.argv)

module.exports = program
