const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createArticle = (req, res) => {
  const { token } = req.headers
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

exports.editArticle = (req, res) => {
  const values = [req.body.title, req.body.article, req.params.articleId]
  const text = 'UPDATE posts SET title = $1, body = $2 WHERE pid = $3 RETURNING title, body'
  pool.query(text, values)
    .then((qRes) => {
      data = { message: 'Article successfully updated' }
      data.title = qRes.rows[0].title
      data.article = qRes.rows[0].body
      res.status(200).json({ status: 'success', data: data })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}

exports.deleteArticle = (req, res) => {
  pool.query(`DELETE FROM posts WHERE pid = ${req.params.articleId}; DELETE FROM comments WHERE  postid = ${req.params.articleId}`)
    .then(() => {
      data = { message: 'Article successfully deleted' }
      res.status(204).json({ status: 'success', data: data })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}

exports.articleComment = (req, res) => {
  pool.query(`SELECT title, body FROM posts WHERE pid =${req.params.articleId}`)
    // eslint-disable-next-line consistent-return
    .then((qRes) => {
      if (!qRes.rows[0]) {
        pool.end()
        return res.status(404).json({ error: 'Article not found' })
      }
      const { token } = req.headers
      const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
      const { userId } = decodedToken
      const values = [req.body.comment, req.params.articleId, userId]
      const text = 'INSERT INTO comments (comment, postId, userId, createdon) VALUES($1, $2, $3, NOW()) RETURNING comment,postId, createdon'
      pool.query(text, values)
        .then((q2Res) => {
          data = { message: 'Comment successfully created' }
          data.createdOn = q2Res.rows[0].createdon
          data.articleTitle = qRes.rows[0].title
          data.article = qRes.rows[0].article
          data.comment = q2Res.rows[0].comment
          res.status(201).json({ status: 'success', data: data })
        })
        .catch((error) => {
          pool.end()
          res.status(400).json({ error: error })
        })
    })
    .catch((error) => {
      pool.end()
      res.status(400).json({ error: error })
    })
}

exports.singleArticle = (req, res) => {
  pool.query(`SELECT pid, title, body, createdon FROM posts WHERE pid =${req.params.articleId}`)
  // eslint-disable-next-line consistent-return
    .then((qRes) => {
      if (!qRes.rows[0]) {
        pool.end()
        return res.status(404).json({ error: 'Article not found' })
      }
      const values = [req.params.articleId]
      const text = 'SELECT cid, comment, userid AS authorId FROM comments WHERE postid = $1'
      pool.query(text, values)
        .then((q2Res) => {
          data = {}
          data.id = qRes.rows[0].pid
          data.createdOn = qRes.rows[0].createdon
          data.articleTitle = qRes.rows[0].title
          data.article = qRes.rows[0].body
          data.comments = q2Res.rows
          res.status(200).json({ status: 'success', data: data })
        })
        .catch((error) => {
          pool.end()
          res.status(400).json({ error: error })
        })
    })
    .catch((error) => {
      pool.end()
      res.status(400).json({ error: error })
    })
}
