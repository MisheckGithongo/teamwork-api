const express = require('express')

const router = express.Router()

const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')


router.post('/create-user', auth, userCtrl.createAccount)
router.post('/signin', userCtrl.signin)

module.exports = router
