/* eslint-env node, jest */
import requestLogger from './../lib/requestLogger'

describe('requestLogger', () => {
  test('Should run logger twice with :method, :url & :body', () => {
    const drawer = {
      logger: { info: jest.fn() },
    }
    const req = {
      method: 'POST',
      get: () => 'localhost',
      originalUrl: '/any',
      body: { a: 1, b: 2 },
    }
    const next = jest.fn()
    requestLogger(drawer, req, null, next)
    expect(drawer.logger.info.mock.calls.length).toBe(2)
    expect(next.mock.calls.length).toBe(1)
  })
})
