const express = require('express')
const fileupload = require('express-fileupload')
const gifCtrl = require('../controllers/gif')

const router = express.Router()

router.post('/', fileupload({ useTempFiles: true }), gifCtrl.createGif)


module.exports = router
