/* eslint-env node, jest */
import router from './../lib/router'

const app = {
  appName: 'Test App',
  get: jest.fn(),
  post: jest.fn(),
}

const exoDrawer = {}

describe('router', () => {
  test('Must throw error when routes is not an Array', () => {
    const routes = () => {}
    const useMethod = () => {
      router(app, exoDrawer, routes)
    }
    expect(useMethod).toThrowError(/must be passed as an Array/)
  })

  test('Must throw error if any route is missing "path"', () => {
    const routes = [{ exec: () => {} }]
    const useMethod = () => {
      router(app, exoDrawer, routes)
    }
    expect(useMethod).toThrowError(/that is missing the required "path"/)
  })

  test('Must throw error if any route is missing "exec" function', () => {
    const routes = [{ path: '/path' }]
    const useMethod = () => {
      router(app, exoDrawer, routes)
    }
    expect(useMethod).toThrowError(/that is missing the required "exec"/)
  })

  test('app.get must be used when route does not provide the HTTP method', () => {
    const routes = [
      {
        path: '/path',
        exec: () => {},
      },
    ]
    router(app, exoDrawer, routes)
    expect(app.get).toHaveBeenCalled()
  })

  test('app[method] must be properly called when HTTP method is present in route', () => {
    const routes = [
      {
        method: 'post',
        path: '/path',
        exec: () => {},
      },
    ]
    router(app, exoDrawer, routes)
    expect(app.post).toHaveBeenCalled()
  })
})
