let template = ''

template += `# Logs\n`
template += `logs\n`
template += `*.log\n`
template += `npm-debug.log*`
template += `\n\n`
template += `# Runtime data\n`
template += `pids\n`
template += `*.pid\n`
template += `*.seed`
template += `\n\n`
template += `# Directory for instrumented libs generated by jscoverage/JSCover\n`
template += `lib-cov`
template += `\n\n`
template += `# Coverage directory used by tools like istanbul\n`
template += `coverage`
template += `\n\n`
template += `# nyc test coverage\n`
template += `.nyc_output`
template += `\n\n`
template += `# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)\n`
template += `.grunt`
template += `\n\n`
template += `# node-waf configuration\n`
template += `.lock-wscript`
template += `\n\n`
template += `# Compiled binary addons (http://nodejs.org/api/addons.html)\n`
template += `build/Release`
template += `\n\n`
template += `# Dependency directories\n`
template += `node_modules\n`
template += `jspm_packages`
template += `\n\n`
template += `# Optional npm cache directory\n`
template += `.npm`
template += `\n\n`
template += `# Optional REPL history\n`
template += `.node_repl_history\n`

module.exports = template
