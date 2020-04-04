'use strict'
const mongoose = require('mongoose')//*constante que utiliza la herramienta mongoose
const app = require('./app')//*manda a hablar a la ruta de app
const port = process.env.PORT || 3000//*establece el puerto a utilizarse
const local = "mongodb://localhost:27017/database"//*establece la ruta local de la base de datos

mongoose.connect(local, (err, res)=>{
    if (err){
        return console.log(`Error connecting to datebase: ${err}`)
    }
    console.log('Database connection established')
    app.listen(port, ()=>{
        console.log(`API Rest running at http://localhost:${port}`)
    })
})//*conector a la base de datos