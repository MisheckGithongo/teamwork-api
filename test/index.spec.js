const frisby = require('frisby')
// eslint-disable-next-line no-unused-vars
const server = require('../server')

const baseUrl = 'http://localhost:3000'
describe('GET time', () => {
  it('Simple test_db test', (done) => {
    frisby
      .fetch(baseUrl, {
        method: 'GET',
      })
      .then((response) => {
        expect(response.status).toBe(200)
      })
      .done(done)
  })
})
