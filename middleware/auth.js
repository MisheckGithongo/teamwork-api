const jwt = require('jsonwebtoken')
const role = require('../roles')

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.headers.token) return res.status(401).send('Access Denied: No Token Provided!')
  try {
    const { token } = req.headers
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
    if (req.baseUrl + req.url === '/api/v1/auth/user') {
      const { userId } = decodedToken
      req.userId = userId
      next()
    } else if (role[decodedToken.role].find((url) => url === req.baseUrl)) {
      const { userId } = decodedToken
      req.userId = userId
      next()
    } else {
      return res.status(401).json({ error: 'Access Denied: You dont have correct privilege to perform this operation' })
    }
  } catch (error) {
    res.status(401).json({ error: new Error('Invalid request!') })
  }
}
