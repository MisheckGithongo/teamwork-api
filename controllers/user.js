const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const pool = require('../db')

exports.createAccount = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const values = [req.body.firstname, req.body.lastname,
      req.body.email, hash, req.body.gender,
      req.body.jobRole, req.body.department, req.body.address]
    const text = 'INSERT INTO users (firstname, lastname, email, password, gender, jobrole, department, address, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING uid, email, role'
    pool.query(text, values)
      .then((qRes) => {
        data = { message: 'User account successfully created' }
        data.token = jwt.sign(
          { userId: qRes.rows[0].uid, email: qRes.rows[0].email, role: qRes.rows[0].role },
          process.env.RANDOM_TOKEN_SECRET,
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

exports.signin = (req, res) => {
  const values = [req.body.email, req.body.username]
  const text = 'SELECT * FROM users WHERE email = $1 OR email = $2'
  pool.query(text, values)
    // eslint-disable-next-line consistent-return
    .then((qRes) => {
      if (!qRes.rows[0]) {
        return res.status(401).json({
          error: new Error('User not found!'),
        })
      }
      bcrypt.compare(req.body.password, qRes.rows[0].password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ error: error })
          }
          const token = jwt.sign(
            { userId: qRes.rows[0].uid, email: qRes.rows[0].email, role: qRes.rows[0].role },
            process.env.RANDOM_TOKEN_SECRET,
            { expiresIn: '24h' },
          )
          const data = { token: token }
          data.userId = qRes.rows[0].uid
          res.status(200).json({ status: 'success', data: data })
        })
        .catch(() => {
          res.status(400).json({ error: 'Invalid Password' })
        })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}
exports.user = (req, res) => {
  const values = [req.userId]
  const text = 'SELECT uid, firstname, lastname, email, gender FROM users WHERE uid= $1'
  pool.query(text, values)
    // eslint-disable-next-line consistent-return
    .then((qRes) => {
      if (!qRes.rows[0]) {
        return res.status(401).json({
          error: new Error('User not found!'),
        })
      }
      res.status(200).json({ status: 'success', data: qRes.rows[0] })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
}
