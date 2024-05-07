const jwt = require("jsonwebtoken");
require('dotenv').config()
const JWT_SECRECT = process.env.JWT_SECRECT
//importamos la fuuncion que verifica y setea el query dependiendo de la base de datos en uso
 const {getPropierties} = require ("../utils/handlePropiertiesEngine")
 const PropiertiesKey = getPropierties()

//token sing recibe el objeto de usuario 
const tokenSign = async (user) => {
    const sign = jwt.sign(
      {
        //propierties retornara un array que dependendo la base de datos puede ser de un tipo de id/_id
        //metodo mongo  _id:user._id
        //metodo sql     id:user.id
        [PropiertiesKey.id]: user[PropiertiesKey.id],
        role: user.role,
      },
      JWT_SECRECT,
      {
        expiresIn: "2h",
      }
    );
  
    return sign
  };


const verifyToken = async (tokenJwt) =>{

    try {
        return jwt.verify(tokenJwt,JWT_SECRECT)

    } catch (e) {
        null
    }
}







module.exports = {tokenSign,verifyToken}