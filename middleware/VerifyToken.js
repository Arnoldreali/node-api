const jwt =require('jsonwebtoken')//*exporta la herramienta para crear el token 

function verifyToken(req, res, next){
    let token =req.headers['x-access-token'];
    console.log(token)
    if(!token ){
        return res.status(403).send({ auth:false, message: 'No token provided'})
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if (err)
        return res.status(500).send({ auth:false, message: 'Failed to authenticate token'})
        req.userId = decoded.id;
        next();
    })
}//* funcion que crea un token con la herramineta y hace las validaciones de los tokens de los usuarios.
module.exports = verifyToken//*exporta todo lo que se encuentra dentro del archivo