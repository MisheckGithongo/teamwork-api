const frisby = require('frisby')
const path = require('path')
const fs = require('fs')
const env = require('../spec/support/env.json')
require('dotenv').config()
require('coveralls')
// eslint-disable-next-line no-unused-vars
const server = require('../server')

const { baseUrl } = env.api
describe('endpoint tests', () => {
  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
  })
  describe('POST /auth/create-user', () => {
    it('Should create a new user', async (done) => {
      frisby
        .fetch(`${baseUrl}/auth/create-user`, {
          method: 'POST',
          headers: {
            token: process.env.API_ADMIN_TOKEN,
          },
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
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })

  describe('POST /gifs', () => {
    it('Should post a gif', (done) => {
      const gif = path.resolve('img', './test.gif')
      const content = fs.createReadStream(gif)
      const formData = frisby.formData()
      formData.append('image', content)
      formData.append('title', 'test gif')
      frisby
        .setup({
          request: {
            // eslint-disable-next-line quote-props
            'timeout': 360000,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        })
        .fetch(`${baseUrl}/gifs`, {
          method: 'POST',
          headers: {
            token: process.env.TEST_TOKEN,
          },
          body: formData,
        })
        .then((response) => {
          expect(response.status).toBe(201)
        })
        .done(done)
    })
  })


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

  describe('POST /articles/<articleId>/comment', () => {
    it('Should Create an article comment', (done) => {
      frisby
        .fetch(`${baseUrl}/articles/${env.api.articleId}/comment`, {
          method: 'POST',
          headers: {
            token: process.env.TEST_TOKEN,
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
    it('Should Create a gif comment', (done) => {
      frisby
        .fetch(`${baseUrl}/gifs/${env.api.gifId}/comment`, {
          method: 'POST',
          headers: {
            token: process.env.TEST_TOKEN,
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
            token: process.env.TEST_TOKEN,
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
            token: process.env.TEST_TOKEN,
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
              token: process.env.TEST_TOKEN,
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
            token: process.env.TEST_TOKEN,
          },
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })


  describe('DELETE /gifs/<:gifId>', () => {
    it('Employees can delete their gifs', (done) => {
      frisby
        .setup({
          request: { timeout: 360000 },
        })
        .fetch(`${baseUrl}/gifs/${env.api.gifId}`, {
          method: 'DELETE',
          headers: {
            token: process.env.TEST_TOKEN,
          },
        })
        .then((response) => {
          expect(response.status).toBe(200)
        })
        .done(done)
    })
  })
})
