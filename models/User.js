const mongoose = require('mongoose')//*exporta la herramienta mongoose
const Schema = mongoose.Schema//*constante que crea el scheme con la herrammienta mongoose

const UserProfileSchema = Schema({

    username:{
        type: String//*establece el tipo de dato para el nombre de usuario 
    },
    phone: {
        type: String,
        optinal: true//*establece el tipo de dato para numero de telefono ademas permite dejarlo en blanco
    }, 
    email: {
        type: String,//*establece el tipo de dato para email

    },
    roles:{
        type:[String],
        allowedValues:['admin','manager','developer']//*establece el tipo de rol ademas solo permite ciertos datos 

    },
    password:{
        type: String,//* establece el tipo de dato de contraseña

    }
})//*schema que establece como se crea un usuario 

module.exports = mongoose.model('Users', UserProfileSchema)//*exporta todo lo que esta en este archivo