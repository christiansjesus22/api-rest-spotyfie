//importando manejador de errores
const {handleHttpError} = require("../utils/handleError")
//importando verificador de token
const {verifyToken} = require ("../utils/handleJwt")
//importamos modelo de usuario para rastrear acciones
const { userModel } = require("../models")
//importamos la fuuncion que verifica y setea el query dependiendo de la base de datos en uso
const {getPropierties} = require ("../utils/handlePropiertiesEngine")
const PropiertiesKey = getPropierties()


const sessionsMidleware = async (req, res, next) => {

    try {

        //verificamos que exista el token en la propiedad autorization en el headers
        if (!req.headers.authorization) {
            handleHttpError(res, "ERROR_SIN_TOKEN");
            return
        }
        //dividimos el string que viene espaciado de la palabra bearer 
        const token = req.headers.authorization.split(' ').pop();  //bearer TOKEN-12345
        //verificamos que el token cumple con la estructura
        const dataToken = await verifyToken(token);

        //verificamos que en el token exista la propiedad id. que viene desde que viene desde el tokenSign 
        if (!dataToken[PropiertiesKey.id]) {
            handleHttpError(res, "ERROR_SIN_ID");
            return
        }
            

        const query = {
        [PropiertiesKey.id]: dataToken[PropiertiesKey.id]
        }
        
        //obteniendo el usuario al que pertenece el token de la solicitacion
        const user = await  userModel.findOne(query)
        // inyectamos en la peticion la propiedad del usuario
        req.user =user
        
        next()
   
    } catch (error) {
        handleHttpError(res, "ERROR_SESSION",401);
        console.log ('el id', PropiertiesKey.id)
        console.log (error)
   }
}

module.exports = {sessionsMidleware}