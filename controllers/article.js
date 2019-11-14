const jwt = require('jsonwebtoken')

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
