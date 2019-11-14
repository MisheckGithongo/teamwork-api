const express = require('express')

const router = express.Router()

const articleCtrl = require('../controllers/article')


router.post('/articles', articleCtrl.createArticle)
router.patch('/articles/:articleId', articleCtrl.editArticle)

module.exports = router
