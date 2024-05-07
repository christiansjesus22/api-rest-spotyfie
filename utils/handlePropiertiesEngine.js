//manejador dinamico de propiedades id / _id
//porque es diferente el id desde sql y mongodb
// importamos nuestra variable de entorno
require('dotenv').config()
//selector de motor de base de datos
const ENGINE_DB = process.env.ENGINE_DB

const getPropierties = () =>{
    //dependiendo de cual sea el motor de db setearemos la propiedad id/_id para la query
    const data = {
        nosql:{
            id:'_id'
        },
        mysql:{
            id:'id'
        }
    }

    return data [ENGINE_DB]
}

 module.exports = {getPropierties}