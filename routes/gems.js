const router = require('express').Router()

let GemController = require('../controllers/Gems')
const VerifyToken = require('../middleware/VerifyToken')
const multipart = require('connect-multiparty')

router.get('/getGems', VerifyToken,  GemController.getGems)

router.post('/getGems', VerifyToken,  GemController.getGems)

router.post('/addGem', GemController.createGem)

router.post('/getGem', VerifyToken, GemController.getGem)

router.post('/updateGem', VerifyToken, GemController.updateGem)

router.post('/deleteGem', VerifyToken, GemController.deleteGem)

router.use(multipart({
    uploadDir: 'tmp'
}))

router.post('/uploadphoto', GemController.uploadPhotos)

module.exports = router