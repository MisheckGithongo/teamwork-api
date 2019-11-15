const express = require('express')

const router = express.Router()

const articleCtrl = require('../controllers/article')


router.post('/articles', articleCtrl.createArticle)
router.patch('/articles/:articleId', articleCtrl.editArticle)
router.delete('/articles/:articleId', articleCtrl.deleteArticle)
router.post('/articles/:articleId/comment', articleCtrl.articleComment)

module.exports = router
