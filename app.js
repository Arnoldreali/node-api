'user strict'
    const express = require('express')//*constante que manda a llamar la herramienta express
    const bodyParser = require('body-parser')//* constante que manda a llamar la herramienta body parser
    const gems = require('./routes/gems')//*constante que manda a llamar la ruta de gemas
    const auth = require('./routes/auth')//* constante que manda a llamar la ruta de autenticacion 
    
    const app = express()//*crea una constante que utiliza express
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    app.get('/', (req, res)=>{
        res.send("hello world 2")
    })
    app.use('/auth', auth)
    app.use('/gems', gems)
    module.exports = app //*exporta lo que hay en este archivo