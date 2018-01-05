const program = require('commander')

program
  .version('1.0.0')
  .option('--arch [type]', 'Create an empty skeleton architecture')
  .option('-c --controller [group name]', 'Create an empty, ready to use, controller(s) group')
  .option('-n --controller-name [name]', 'Optional controller name for a single controller')
  .parse(process.argv)

module.exports = program
