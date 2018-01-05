/* eslint-env node, jest */
const manageViews = require('./../lib/manageViews')

const app = {
  appName: 'Test App',
  set: jest.fn(),
  engine: jest.fn(),
}

const viewsDir = './views'

describe('manageViews', () => {
  test('Must throw error when viewsEngine missing', () => {
    const useMethod = () => {
      manageViews(app, viewsDir)
    }
    expect(useMethod).toThrowError(/"viewsEngine" must be specified/)
  })

  test('app.set "views" must be called', () => {
    const viewsEngine = 'pug'
    manageViews(app, viewsDir, viewsEngine)
    expect(app.set).toHaveBeenCalledWith('views', viewsDir)
  })

  test('app.set "view engine" must be called when viewsEngine only as String', () => {
    const viewsEngine = 'pug'
    manageViews(app, viewsDir, viewsEngine)
    expect(app.set).toHaveBeenCalledWith('views', viewsDir)
    expect(app.set).toHaveBeenCalledWith('view engine', viewsEngine)
  })

  test('Must throw error when viewsEngine is Object and "ext" or "engineFunc" are missing', () => {
    const viewsEngine = { ext: 'pug' }
    const useMethod = () => {
      manageViews(app, viewsDir, viewsEngine)
    }
    expect(useMethod).toThrowError(/template engine needs both "ext" and "engineFunc"/)
  })

  test('app.engine & app.set "view engine" must be called when viewsEngine is in Object format', () => {
    const viewsEngine = {
      ext: 'pug',
      engineFunc: () => {},
    }
    manageViews(app, viewsDir, viewsEngine)
    expect(app.set).toHaveBeenCalledWith('views', viewsDir)
    expect(app.engine).toHaveBeenCalledWith(viewsEngine.ext, viewsEngine.engineFunc)
    expect(app.set).toHaveBeenCalledWith('view engine', viewsEngine.ext)
  })
})
