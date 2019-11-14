const frisby = require('frisby')
const env = require('../spec/support/env.json')
// eslint-disable-next-line no-unused-vars
const server = require('../server')

const { baseUrl } = env.api
describe('endpoint tests', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })
  describe('POST /auth/create-user', () => {
    it('Should create a new user', (done) => {
      frisby
        .fetch(`${baseUrl}/auth/create-user`, {
          method: 'POST',
          body: JSON.stringify({
            firstname: env.api.firstname,
            lastname: env.api.lastname,
            email: env.api.email,
            password: env.api.password,
            gender: env.api.gender,
            jobRole: env.api.jobRole,
            department: env.api.department,
            address: env.api.address,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })


  describe('POST /auth/signin', () => {
    it('Should signin an authenticated user', (done) => {
      frisby
        .fetch(`${baseUrl}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: env.api.email,
            password: env.api.password,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })

  /*
  describe('POST /gifs', () => {
    it('Should post a gif', (done) => {
      frisby
        .fetch(`${baseUrl}/gifs`, {
          method: 'POST',
          headers: {
            token: env.api.token,
          },
          body: JSON.stringify({
            image: env.api.gifUrl,
            title: env.api.gifTitle,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })
  */
  describe('POST /articles', () => {
    it('Should Create an article', (done) => {
      frisby
        .fetch(`${baseUrl}/articles`, {
          method: 'POST',
          headers: {
            token: process.env.TEST_TOKEN,
          },
          body: JSON.stringify({
            title: env.api.articleTitle,
            article: env.api.articleBody,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })

  describe('PATCH /articles/<:articleId>', () => {
    it('Should edit an article', (done) => {
      frisby
        .fetch(`${baseUrl}/articles/${env.api.articleId}`, {
          method: 'PATCH',
          headers: {
            token: process.env.TEST_TOKEN,
          },
          body: JSON.stringify({
            title: env.api.editedArticleTitle,
            article: env.api.editedArticleBody,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })
/*
  describe('POST /articles/<articleId>/comment', () => {
    it('Should Create an article', (done) => {
      frisby
        .fetch(`${baseUrl}/articles/${env.api.articleId}/comment`, {
          method: 'POST',
          headers: {
            token: env.api.token,
          },
          body: JSON.stringify({
            comment: env.api.articleComment,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })

  describe('POST /gifs/<:gifId>/comment', () => {
    it('Should Create an article', (done) => {
      frisby
        .fetch(`${baseUrl}/gifs/${env.api.gifId}/comment`, {
          method: 'POST',
          headers: {
            token: env.api.token,
          },
          body: JSON.stringify({
            comment: env.api.gifComment,
          }),
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })

  describe('GET /articles/<:articleId>', () => {
    it('Employees can view a specific article.', (done) => {
      frisby
        .fetch(`${baseUrl}/articles/${env.api.articleId}`, {
          method: 'GET',
          headers: {
            token: env.api.token,
          },
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })

  describe('GET /gifs/<:gifId>', () => {
    it('Employees can view a specific gif post.', (done) => {
      frisby
        .fetch(`${baseUrl}/gifs/${env.api.gifId}`, {
          method: 'GET',
          headers: {
            token: env.api.token,
          },
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })

  describe('GET /feed', () => {
    it('Employees can view all articles or gifs, showing the most recently posted articles',
     (done) => {
      frisby
        .fetch(`${baseUrl}/feed`, {
          method: 'GET',
          headers: {
            token: env.api.token,
          },
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })


  describe('DELETE /articles/<:articleId>', () => {
    it('Employees can delete their articles', (done) => {
      frisby
        .fetch(`${baseUrl}/articles/${env.api.articleId}`, {
          method: 'DELETE',
          headers: {
            token: env.api.token,
          },
        })
        .then((response) => {
          expect(response.status).toBe(204)
        })
        .done(done)
    })
  })

  describe('DELETE /gifs/<:gifId>', () => {
    it('Employees can delete their gifs', (done) => {
      frisby
        .fetch(`${baseUrl}/gifs/${env.api.gifId}`, {
          method: 'DELETE',
          headers: {
            token: env.api.token,
          },
        })
        .then((response) => {
          expect(response.status).toBe(204)
        })
        .done(done)
    })
  })

  */
})
