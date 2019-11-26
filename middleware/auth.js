const jwt = require('jsonwebtoken')
const role = require('../roles')

module.exports = (req, res, next) => {
if (!req.headers.token) return res.status(401).send('Access Denied: No Token Provided!')
try {
    const { token } = req.headers
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
    if (role[decodedToken.role].find(function(url){ return url == req.baseUrl })){
        const { userId } = decodedToken
        req.userId = userId
        next()
    } else {
        return res.status(401).json({error: 'Access Denied: You dont have correct privilege to perform this operation'})
    }
} catch {
    res.status(401).json({ error: new Error('Invalid request!') })
}
}




