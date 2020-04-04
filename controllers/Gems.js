module.exports = {
    getGems,
    getGem,
    createGem,
    getGemsPagination,
    updateGem,
    deleteGem,
    uploadPhotos
}//*exporta los modulos que se crean en la parte de abajo para que puedan ser utilizados por otros archivos

const GemsSub = require('../models/gems')//*constante que manda a llamar al modelo de gemas
const mongoose = require('mongoose')//*constante que manda a llamar a la herramienta de mongoose
const meteorID = require('meteor-mongo-id')//*constante que manda a llamar a la herramienta de meteor-mongo-id
const Random = require('meteor-random')//*constante que manda a llamar a la herramienta de meteaor-random
const cloudinary = require('cloudinary').v2//*constante que manda a llamar a la herramienta de cloudinary
const fs = require('fs')//*constante que manda a llamar a la herramienta de fs

cloudinary.config({
    cloud_name:'arnoldreali',
    api_key:'423672529145183',
    api_secret:'7b3f5cspOjMsqopPuuM7R5O8slk'
})//*configuracion para la configuracion de cloudinary

function getGems(req, res){
    GemsSub.find({},(err, concepts)=>{
        if(err)return res.status(500).send({message: `Problem with the searching request ${err}`})
        if(!concepts) return res.status(404).send({message: 'Gems does not exist'}) 

        res.status(200).send({gems: concepts})
       })
}//funcion para agarrar las gemas ademas de contar con las respuestas de internet (500, 400, 200)

function getGemsPagination(req, res){
    let perPage = parseInt(req.body.perPage)
    let page = parseInt(req.body.page)
    let GemsConceptsRes = null
    let searchData =req.query.search

    GemsSub.find(searchData).skip((page-1)*perPage)
    .limit(perPage)
    .sort({})
    .exec()
    .then((concepts)=>{
        res.set('X-limit', perPage)
        res.set('X-page', page)
        GemsConceptsRes = concepts
        console.info("Result", concepts)
        return GemsSub.count()
    })
    .then((total)=>{
        res.set('X-total', total)
        res.status(200).send({total: total, GemsTotal: GemsConceptsRes.length, GemsConcepts: GemsConceptsRes
        })
        .catch((err)=>{
            console.log(err)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            res.status(500).send({message: `Error in request ${err}`})
        })
    })
}//funcion para agarrar las gemas por paginas ademas de contar con las respuestas de internet (500, 400, 200)

function getGem(req, res){
    let  conceptID = req.body._id
    GemsSub.find({_id: conceptID},(err, concept)=>{
        if(err)return res.status(500).send({message: `Problem with the searching request ${err}`})
        if(!concept) return res.status(404).send({message: 'Gem does not exist'}) 

        res.status(200).send({Gem: concept})
       })
}//funcion para agarrar la gema ademas de contar con las respuestas de internet (500, 400, 200)

function createGem(req, res) {
    let gem = req.body
    let g = {

        _id: Random.id(),

        name: gem.name,
        description: gem.description,
        price: gem.price,
        canPurchase: gem.canPurchase,

        specs: {
            faces: gem.specs.faces,
            color: gem.specs.color,
            rarity: gem.specs.rarity,
            shine: gem.specs.shine
        },

        reviews: [{
            stars: gem.reviews.stars,
            body: gem.reviews.body,
            author: gem.reviews.author,
            createdOn: formatDateName(new Date())
        }]

    }

    const gemToCreate = new GemsSub(g)

    gemToCreate.save((err, gemStored) => {
        if (err) return res.status(400).send({ message: `Error on model ${err}` })

        res.status(200).send({ gem: gemStored })
    })
}//funcion para crear gemas en base al modelo de gemas, ademas de contar con las respuestas de internet (500, 400, 200)

function updateGem(req, res){
    let conceptID =req.body._id
    let update = req.body.Gem

   GemsSub.findByIdAndUpdate(conceptID, update, (err, concept)=>{
     if(err)return res.status(500).send ({message: `Problem with the searching request ${err}`})
        res.status(200).send ({message: `Update Successfull`, Gem: concept})
    })
    
}//funcion para actualizar una gema, ademas de contar con las respuestas de internet (500, 400, 200)
function updateGemWithImages(_id, img) {
    let conceptID = _id
    let update = img

    GemsSub.findByIdAndUpdate(conceptID,
        { "$push": { "images": update } },
        { "new": false, "upsert": false },
        (err, conceptUpdate) => {
            if (err) return res.status(500).send({ message: `Error in the request ${err}` })
            console.log("Gem update", conceptUpdate)
        })

}//funcion para actualizar una gema con imagen, ademas de contar con las respuestas de internet (500, 400, 200)

function deleteGem(req,res){

    const conceptID =req.body._id
    const img =req.body.

    GemsSub.remove({_id: conceptID},(err,concept)=>{

        if(err)return res.status(500).send ({message: `Problem with the searching ${err}`})
        res.status(200).send ({message: `Delete Completed`, Gem: concept})
    })
}//* funcion para eliminar una gema, ademas de contar con las respuestas de internet (500, 400, 200)

function uploadPhotos(req, res) {

    const path = req.files.file.path
    const gemID =req.body._id
    console.log(typeof path)
    const uniqueFilename = Random.id()
    fs.readFile(path, function (err, data) {
        if (err) { throw err }
        cloudinary.uploader.upload(path, { public_id: `gemsImages/${uniqueFilename}`, 
        tags: `gemsImages`},
        (err, result)=> {

            let routeImg =result.url
            let arrayRoute = routeImg.split("/")
            let finalUrl = arrayRoute[6]+"/"+arrayRoute[7]
            +"/"+arrayRoute[8]
                console.log(result);
            if(err) return res.status(500).send(err)
            fs.unlinkSync(path)
            updateGemWithImages(gemID, finalUrl)
            res.status(200).send({message: "upload image sucess", imageData: result})
        
        })
    })
}//funcion para actualizar alguna foto, ademas de contar con las respuestas de internet (500, 400, 200)
function formatDateName(now) {
    let year = now.getFullYear()
    let month = now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
    let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
    let hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    let minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    let seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()

    return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`
} //*funcion para crear una fecha bien establecida