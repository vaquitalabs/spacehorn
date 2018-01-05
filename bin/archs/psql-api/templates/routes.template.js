let template = ''

template += `// Routes format:\n`
template += `// [ id, method, path(optional), controller(optional) ]`
template += `\n\n`
template += `const routes = [\n`
template += `  ['status',        'GET'],\n`
template += `//  ['posts',         'BASIC'],\n`
template += `]`
template += `\n\n`
template += `module.exports = routes\n`

module.exports = template
