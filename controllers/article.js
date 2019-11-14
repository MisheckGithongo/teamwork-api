/* eslint-disable no-console */
const jwt = require('jsonwebtoken')

exports.createArticle = (req, res) => {
  const { token } = req.headers
  console.log(process.env.RANDOM_TOKEN_SECRET)
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
  const { userId } = decodedToken
  const values = [userId, 'article', req.body.title, req.body.article]
  const text = 'INSERT INTO posts (userId, type, title, body, createdon) VALUES($1, $2, $3, $4, NOW()) RETURNING pid, createdon, title, body'
  pool.query(text, values)
    .then((qRes) => {
      data = { message: 'Article successfully posted' }
      data.articleId = qRes.rows[0].pid
      data.createdOn = qRes.rows[0].createdon
      data.title = qRes.rows[0].title
      res.status(201).json({ status: 'success', data: data })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}
