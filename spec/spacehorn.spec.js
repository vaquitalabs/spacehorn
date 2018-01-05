/* eslint-env node, jest */
const Spacehorn = require('./../lib/spacehorn')

const config = {
  routes: [{ path: '/path', exec: () => {} }],
}

// All other tests cover the main functionality used in Spacehorn
describe('Spacehorn', () => {
  test('Should be ready to attend()', () => {
    const app = new Spacehorn(config)
    expect(app.attend).toBeDefined()
  })

  test('Should accept name, port and logger', () => {
    config.name = 'Test App'
    config.port = 3100
    config.logger = {
      log: () => {},
      error: () => {},
      warn: () => {},
    }

    const app = new Spacehorn(config)

    expect(app.name).toBe('Test App')
    expect(app.port).toBe(3100)
    expect(app.executionError).toBe(false)
  })

  test('Should accept publicDir, viewsDir and viewsEngine', () => {
    config.publicDir = '/public'
    config.viewsDir = '/views'
    config.viewsEngine = 'pug'

    const app = new Spacehorn(config)

    expect(app.publicDir).toBe('/public')
    expect(app.viewsDir).toBe('/views')
    expect(app.viewsEngine).toBe('pug')
    expect(app.executionError).toBe(false)
  })

  test('Should handle db, extendDrawer and middleware', () => {
    config.db = {}
    config.extendDrawer = {}
    config.middleware = []

    const app = new Spacehorn(config)

    expect(app.executionError).toBe(false)
  })

  test('Should have error when extendDrawer is not Object', () => {
    const erroredConfig = Object.assign({}, config, { extendDrawer: 'not object' })
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when middleware has errors', () => {
    const erroredConfig = Object.assign({}, config, { middleware: 'should be array' })
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when NO routes', () => {
    const erroredConfig = Object.assign({}, config)
    delete erroredConfig.routes
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when routes have errors', () => {
    const erroredConfig = Object.assign({}, config, { routes: 'should be array' })
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })
})
