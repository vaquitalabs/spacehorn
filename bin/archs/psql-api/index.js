const fs = require('fs')
const path = require('path')
const dirs = require('./dirs')
const files = require('./files')

const createDirs = () => {
  dirs.forEach(dir => {
    const dirPath = path.resolve(process.cwd(), dir)
    fs.mkdirSync(dirPath)
  })
}

const createFiles = () => {
  files.forEach(file => {
    const fileDir = path.resolve(process.cwd(), file.dir)
    const fileContent = file.templatePath ? require(file.templatePath) : ''
    fs.writeFileSync(fileDir, fileContent)
  })
}

const buildSkeleton = () => {
  createDirs()
  createFiles()
}

module.exports = buildSkeleton
