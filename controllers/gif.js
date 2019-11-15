const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const pool = require('../db')

dotenv.config()


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})
exports.createGif = (req, res) => {
  const file = req.files.image
  if (file.mimetype !== 'image/gif') {
    res.status(400).json({ message: 'Unsupported file format' })
  } else {
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      if (err) {
        res.status(400).json({ message: 'An error occurred while uploading your file' })
      } else {
        const { token } = req.headers
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const { userId } = decodedToken
        const values = [userId, 'gif', req.body.title, result.url]
        const text = 'INSERT INTO posts (userId, type, title, body, createdon) VALUES($1, $2, $3, $4, NOW()) RETURNING pid, createdon, title, body'
        pool.query(text, values)
          .then((qRes) => {
            data = {}
            data.gifId = qRes.rows[0].pid
            data.message = 'GIF image successfully posted'
            data.createdOn = qRes.rows[0].createdon
            data.title = qRes.rows[0].title
            data.imageUrl = qRes.rows[0].body
            res.status(201).json({ status: 'success', data: data })
          })
          .catch((error) => {
            res.status(400).json({ error: error })
          })
      }
    })
  }
}
