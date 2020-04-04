const mongoose = require('mongoose')//*constante que manda a llamar la herramienta mongoose
const Schema = mongoose.Schema//*constante que crea un schema con mogoose
const meteorID = require('meteor-mongo-id')//*constante que manda a llamar a la herramienta meteor-mongo-id
const Random = require('meteor-random')//*constante que manda a llmar a la herramienta meteor-random

const ReviewSchema = Schema({
    stars: {
        type: Number,
        allowedValues:[5,4,3,2,1]
    },//establece los valores para la propiedad de estrellas
    body:{
        type:String
    },//*establece el tipo de dato para la propiedad cuerpo
    
    author: {
        type: String
    },//*establece el tipo de dato para la propiedad autor
    createdOn: {
        type: String
    }//*establece el tipo de dato para la propiedad fecha
})//*schema que establece el modelo del review del usuario

const SpecsSchema = Schema ({
    faces: { type: Number },
    color: { type: String },
    
    rarity: { 

    type: Number,
    allowedValues : [1,2,3,4,5,6,7,8,9,10] },
    
    shine: { 
    type: Number,
    allowedValues : [1,2,3,4,5,6,7,8,9,10] }//* establece las caracteristicas como los tipos de datos de las gemas
})//*schema que establace el modelo de los specs o caracteristicas de una gema 

const GemsSchema = Schema({

    _id:{
        type:String//*establece el tipo de dato ID
    },

    name: { type: String },//*establece el tipo de dato para nombre de la gema
    description: { type: String },//*establece el tipo de dato para descripcion
    price: { type: Number },//*establece el tipo de dato para precio
    canPurchase: { type: Boolean },//* establece el tipo de dato para se puede comprar
    specs: {
        type: SpecsSchema//manda a llamar el schema de caracteriticas*
    },

    images: {
        type: [String],//*estable el tipo de dato para imagenes
    },

    reviews:{
        type:[ReviewSchema]//* manda a llamar el schema de review
    }
    

})//*schema para una gema


module.exports = mongoose.model('Gems', GemsSchema)//*exporta todo lo que se encuentra en el archivo