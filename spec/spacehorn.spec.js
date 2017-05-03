/* eslint-env node, jest */
import Spacehorn from './../lib/spacehorn'

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

  test('Should be able to attend with onReady hook', () => {
    config.onReady = () => {}

    const app = new Spacehorn(config)
    app.listen = jest.fn()
    app.attend()
    expect(app.listen).toHaveBeenCalled()
    expect(app.executionError).toBe(false)
  })

  test('Should have error when onReady hook is not Function', () => {
    config.onReady = 'not function'

    const app = new Spacehorn(config)
    app.attend()
    expect(app.executionError).toBe(true)
  })

  test('Should have error when extendDrawer is not Object', () => {
    const erroredConfig = { ...config, extendDrawer: 'not object' }
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when middleware has errors', () => {
    const erroredConfig = { ...config, middleware: 'should be array' }
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when NO routes', () => {
    const erroredConfig = { ...config }
    delete erroredConfig.routes
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })

  test('Should have error when routes have errors', () => {
    const erroredConfig = { ...config, routes: 'should be array' }
    const app = new Spacehorn(erroredConfig)
    expect(app.executionError).toBe(true)
  })
})
