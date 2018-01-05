let template = ''

template += `{\n`
template += `  "development": {\n`
template += `    "username": "localdbs",\n`
template += `    "password": "localdbs",\n`
template += `    "database": "database_name",\n`
template += `    "host": "127.0.0.1",\n`
template += `    "dialect": "postgres"\n`
template += `  },\n`
template += `  "staging": {\n`
template += `    "username": "staging",\n`
template += `    "password": "database_pwd",\n`
template += `    "database": "database_name",\n`
template += `    "host": "127.0.0.1",\n`
template += `    "dialect": "postgres"\n`
template += `  },\n`
template += `  "production": {\n`
template += `    "username": "deployer",\n`
template += `    "password": "database_pwd",\n`
template += `    "database": "database_name",\n`
template += `    "host": "127.0.0.1",\n`
template += `    "dialect": "postgres"\n`
template += `  }\n`
template += `}\n`

module.exports = template
