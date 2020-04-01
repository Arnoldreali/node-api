let router = require('express').Router()

const AuthController = require('../controllers/Auth')
const VerifyToken = require('../middleware/VerifyToken')

router.post('/login', AuthController.loginUser)
router.post('/logout',  AuthController.logoutUser)
router.post('/me', VerifyToken, AuthController.getCurrentUser) 
router.post('/signup', AuthController.signInUser)

module.exports = router