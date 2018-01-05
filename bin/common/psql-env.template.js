let template = ''

template += `ENV=development\n`
template += `PORT=3000`
template += `\n\n`
template += `DB_HOST=localhost\n`
template += `DB_NAME=database_name\n`
template += `DB_USERNAME=localdbs\n`
template += `DB_PASSWORD=localdbs\n`

module.exports = template
