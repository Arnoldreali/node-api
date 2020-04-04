module.exports = {
    loginUser,
    logoutUser,
    getCurrentUser,
    signInUser
}//*exporta los modulos que se crean en la parte de abajo para que puedan ser utilizados por otros archivos
const User = require('../models/User')//* constante para mandar a llamar al modelo de usuarios
const jwt = require('jsonwebtoken')//* constante para mandar a llamar a la herramienta par crear tokens
const bcrypt =require('bcryptjs')//* constante que manda a llamar a la herramienta bcryptjs
const sha256 = require('sha256')//* constante que manda a llamar a la herramienta sha256
const Ramdon = require('meteor-random')//* constante que manda a llamar la herramienta meteor-random
const verifyToken = require('../middleware/VerifyToken')//*constante que manda a llamar la ruta de el token de verificacion

function loginUser(req, res){
    User.findOne({username: req.body.username}).then((user)=>{
        if(!user) return res.status(404).send('No user found')


        let passwordIsValid = bcrypt.compareSync(req.body.password,user.password, user.password)
        if(!passwordIsValid) return res.status(401).send({auth: false, message: 'Error password', token: null})
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn: 864000})
        res.status(200).send({auth:true, token: token, username: user.toObject().username})
        
        

    })
    .catch((err)=>{
        console.log("Error on catch", err)
        res.status(500).send({message: 'Error on USER', error: err})
    })
}//*funcion que hace el inicio de sesion de un usuario ademas manda los errores que puede tener

function logoutUser(req, res){
    res.status(200).send({auth:false, token:null});
}//*funcion que cierra la sesion 

function getCurrentUser(req, res){
    let token = req.headers['x-acces-token']

    if(!token) return res.status(401).send({auth:false, message: 'No token provided'})

    verifyToken(token)
    .then((decode)=> User.findOne({id: decode.id}))
    .then((user)=>{
        if(!user) return res.status(401).send({auth: false, message: 'No user found'})
        res.status(200).send(user)
    })
    .catch((err)=> res.status(500).send({err}))

}//* funcion que toma al usario que tiene la sesion en el momento 

function signInUser(req, res){
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        roles: req.body.roles
    })


    user.save((err)=>{
        let token =jwt.sign({id: user.id}, process.env.JWT_SECRET, 
            {expiresIn: 86400})

            if(err) return res.status(500).send(
            {message:`Problem creating new user${err}`})

            return res.status(201).send({token: token,
            message: 'User Created'})
        
    })
}//*funcion que crea a nuevos usuarios