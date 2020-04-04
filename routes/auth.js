let router = require('express').Router()//*hace llamar a la "herramienta" router que no ayudara con el post

const AuthController = require('../controllers/Auth') //*constante que manda llamar a la autenticacion de los controles 
const VerifyToken = require('../middleware/VerifyToken')//*constante que manda llamar a el token de middleware que lo usa para la verificacion

router.post('/login', AuthController.loginUser)//*metodo post para hacer login o iniciar sesion
router.post('/logout',  AuthController.logoutUser)//*metodo post para hacer logout o cerrar sesion
router.post('/me', VerifyToken, AuthController.getCurrentUser) //*metodo que sirve para saber el usuario iniciado
router.post('/signup', AuthController.signInUser)//*metodo que sirve para crear un usuario

module.exports = router//*manera de exportar a otros archivos lo que esta aqui