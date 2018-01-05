const fs = require('fs')
const path = require('path')

const pathResolve = dir => path.resolve(process.cwd(), dir)

const createDir = (dir) => {
  const dirPath = pathResolve(dir)
  if (fs.existsSync(dirPath))
    return dirPath
  fs.mkdirSync(dirPath)
  return dirPath
}

const createController = (name, content, group) => {
  const dir = group ? path.join(createDir(group), name) : pathResolve(name)
  if (fs.existsSync(`${dir}.js`)) return
  return fs.writeFileSync(`${dir}.js`, content)
}

module.exports = createController
