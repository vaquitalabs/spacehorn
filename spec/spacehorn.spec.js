/* eslint-env node, jest */
import Spacehorn from './../lib/spacehorn'

const config = {
  name: 'Test App',
  routes: [{ path: '/path', exec: () => {} }],
}

// All other tests cover the main functionality used in Spacehorn
describe('Spacehorn', () => {
  test('Should be ready to attend()', () => {
    const app = new Spacehorn(config)
    expect(app.attend).toBeDefined()
  })
})
