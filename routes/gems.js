const router = require('express').Router()//*constante que manda a llamar la herramienta router y express

let GemController = require('../controllers/Gems')//*se manda a llamar el controlador de las gemas
const VerifyToken = require('../middleware/VerifyToken')//*se manda a llamar la verificacion del token
const multipart = require('connect-multiparty')//*se manda a llamar la multi conexion

router.get('/getGems', VerifyToken,  GemController.getGems)//* exporta la ruta para agarrar una gema 

router.post('/getGems', VerifyToken,  GemController.getGems)//* exporta la ruta para agarrar varias gemas

router.post('/addGem',VerifyToken, GemController.createGem)//* exporta la ruta para agregar una gema 

router.post('/getGem', VerifyToken, GemController.getGem)//* exporta la ruta para agarar una gema 

router.post('/updateGem', VerifyToken, GemController.updateGem)//* exporta la ruta para actualizar una gema

router.post('/deleteGem', VerifyToken, GemController.deleteGem)//* exporta la ruta para borrar una gema

router.use(multipart({uploadDir: 'tmp'}))//*ruta de una carpeta creada 

router.post('/uploadphoto', GemController.uploadPhotos)//*ruta para agregar una foto a una gema

module.exports = router//*exportar lo que esta en este archivo a otros