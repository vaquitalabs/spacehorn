/* eslint-env node, jest */
import applyMiddleware from './../lib/applyMiddleware'

const app = {
  appName: 'Test App',
  use: jest.fn(),
}

const drawer = {}

describe('applyMiddleware', () => {
  test('Must throw error when middleware != Array', () => {
    const middleware = () => {}
    const useMethod = () => {
      applyMiddleware(app, drawer, middleware)
    }

    expect(useMethod).toThrowError(/must be an Array/)
  })

  test('Must call app.use only with the middleware function', () => {
    const middleware = [ () => {} ]
    applyMiddleware(app, drawer, middleware)
    expect(app.use).toHaveBeenCalledWith(middleware[0])
  })

  test('Must call app.use with middleware path & function', () => {
    const middleware = [
      {
        path: '/any',
        run: () => {},
      },
    ]

    applyMiddleware(app, drawer, middleware)
    expect(app.use).toHaveBeenCalledWith(middleware[0].path, middleware[0].run)
  })

  test('Must call app.use with the proper mixed scenario', () => {
    const middleware = [
      () => {},
      {
        path: '/any',
        run: (req, res, next) => {},
      },
      {
        path: '/any',
        run: (drawer, req, res, next) => {},
      },
    ]

    applyMiddleware(app, drawer, middleware)
    expect(app.use).toHaveBeenCalledWith(middleware[0])
    expect(app.use).toHaveBeenCalledWith(middleware[1].path, middleware[1].run)
  })
})
