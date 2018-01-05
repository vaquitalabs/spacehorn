let template = ''

template += `// const AuthorModel = require('./author')\n`
template += `// const PostModel = require('./post')`
template += `\n\n`
template += `const models = [\n`
template += `//  AuthorModel,\n`
template += `//  PostModel,\n`
template += `]`
template += `\n\n`
template += `module.exports = models\n`

module.exports = template
