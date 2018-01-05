let template = ''

template += `const associations = [\n`
template += `//  {\n`
template += `//    modelA: 'Post',\n`
template += `//    modelB: 'Author',\n`
template += `//    association: 'belongsTo',\n`
template += `//    byAttrs: { foreignKey: 'author_id' },\n`
template += `//  },\n`
template += `]`
template += `\n\n`
template += `module.exports = associations\n`

module.exports = template
