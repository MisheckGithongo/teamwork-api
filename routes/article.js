const express = require('express')

const router = express.Router()

const articleCtrl = require('../controllers/article')


router.post('/articles', articleCtrl.createArticle)

module.exports = router