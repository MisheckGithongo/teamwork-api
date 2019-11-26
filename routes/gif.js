const express = require('express')
const fileupload = require('express-fileupload')
const gifCtrl = require('../controllers/gif')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, fileupload({ useTempFiles: true }), gifCtrl.createGif)
router.post('/:gifId/comment', auth, gifCtrl.gifComment)
router.get('/:gifId', auth, gifCtrl.singleGif)
router.delete('/:gifId', auth, gifCtrl.deleteGif)


module.exports = router
