/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
module.exports.feed = (req, res) => {
  pool.query('SELECT * FROM posts ORDER BY createdon DESC')
    .then((qRes) => {
      if (!qRes.rows[0]) {
        pool.end()
        return res.status(404).json({ error: 'No posts Found' })
      }
      const data = qRes.rows
      const posts = data.map((post) => {
        if (post.type === 'article') {
          const data1 = {}
          data1.id = post.id
          data1.createdOn = post.createdon
          data1.title = post.title
          data1.article = post.body
          data1.authorId = post.userid
          return data1
        }
        if (post.type === 'gif') {
          const data1 = {}
          data1.id = post.id
          data1.createdOn = post.createdon
          data1.title = post.title
          data1.url = post.body
          data1.authorId = post.userid
          return data1
        }
      })
      res.status(200).json({ status: 'success', data: posts })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}
