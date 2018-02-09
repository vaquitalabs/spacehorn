const path = require('path')

const files = [
  {
    dir: 'index.js',
    templatePath: path.join(__dirname, 'templates', 'entry.template.js')
  },
  {
    dir: 'app/controllers/status/get.js',
    templatePath: path.join(__dirname, 'templates', 'status-get-controller.template.js')
  },
  {
    dir: 'app/db/index.js',
    templatePath: path.join(__dirname, 'templates', 'db.template.js')
  },
  {
    dir: 'app/models/associations.js',
    templatePath: path.join(__dirname, 'templates', 'associations.template.js')
  },
  {
    dir: 'app/models/index.js',
    templatePath: path.join(__dirname, 'templates', 'models.template.js')
  },
  {
    dir: 'app/routes/index.js',
    templatePath: path.join(__dirname, 'templates', 'routes.template.js')
  },
  {
    dir: 'app/server/index.js',
    templatePath: path.join(__dirname, 'templates', 'server.template.js')
  },
  {
    dir: 'config/config.json',
    templatePath: path.join(__dirname, '..', '..', 'common', 'psql-config.template.js')
  },
  {
    dir: 'config/.keep'
  },
  {
    dir: 'migrations/.keep'
  },
  {
    dir: 'seeders/.keep'
  },
  {
    dir: '.editorconfig',
    templatePath: path.join(__dirname, '..', '..', 'common', 'editorconfig.template.js')
  },
  {
    dir: '.env',
    templatePath: path.join(__dirname, '..', '..', 'common', 'psql-env.template.js')
  },
  {
    dir: '.gitignore',
    templatePath: path.join(__dirname, '..', '..', 'common', 'gitignore.template.js')
  },
  {
    dir: 'package.json',
    templatePath: path.join(__dirname, '..', '..', 'common', 'psql-package.template.js')
  }
]

module.exports = files
