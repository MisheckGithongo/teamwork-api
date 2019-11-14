const express = require('express')

const router = express.Router()

const userCtrl = require('../controllers/user')


router.post('/create-user', userCtrl.createAccount)
router.post('/signin', userCtrl.signin)

module.exports = router
