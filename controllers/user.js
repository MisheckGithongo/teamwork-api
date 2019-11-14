const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

exports.createAccount = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const values = [req.body.firstname, req.body.lastname,
      req.body.email, hash, req.body.gender,
      req.body.jobRole, req.body.department, req.body.address]
    const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING uid, email'
    pool.query(text, values)
      .then((qRes) => {
        data = { message: 'User account successfully created' }
        data.token = jwt.sign(
          { userId: qRes.rows[0].uid, email: qRes.rows[0].email }, process.env.RANDOM_TOKEN_SECRET,
          { expiresIn: '24h' },
        )
        data.userId = qRes.rows[0].uid
        res.status(201).json({ status: 'success', data: data })
      })
      .catch((error) => {
        res.status(400).json({ error: error })
      })
  })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}
