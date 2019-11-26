const express = require('express')

const router = express.Router()

const articleCtrl = require('../controllers/article')
const auth = require('../middleware/auth')


router.post('/', auth, articleCtrl.createArticle)
router.patch('/:articleId', auth, articleCtrl.editArticle)
router.delete('/:articleId', auth, articleCtrl.deleteArticle)
router.post('/:articleId/comment', auth, articleCtrl.articleComment)
router.get('/:articleId', auth, articleCtrl.singleArticle)

module.exports = router
