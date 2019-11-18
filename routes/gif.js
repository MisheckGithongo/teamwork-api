const express = require('express')
const fileupload = require('express-fileupload')
const gifCtrl = require('../controllers/gif')

const router = express.Router()

router.post('/', fileupload({ useTempFiles: true }), gifCtrl.createGif)
router.post('/:gifId/comment', gifCtrl.gifComment)
router.get('/:gifId', gifCtrl.singleGif)
router.delete('/:gifId', gifCtrl.deleteGif)


module.exports = router
