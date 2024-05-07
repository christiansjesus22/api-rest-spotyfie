//cambiando modelos de manera dinmamica 
// importamos nuestra variable de entorno
require('dotenv').config()
//importando selector de base de datos 
const ENGINE_DB = process.env.ENGINE_DB

var models = {}

if (ENGINE_DB === "nosql") {
  models = {
    userModel : require ("./noSql/users"),
    tracksModel : require ("./noSql/tracks"),
    storageModel : require ("./noSql/storage"),
    //recordar poner el modelo para node
   // songStorageModel: require ("./sql/songStorage")

 }
} else {
   models = {
    userModel : require ("./sql/users"),
    tracksModel : require ("./sql/tracks"),
    storageModel : require ("./sql/storage"),
    songStorageModel: require ("./sql/songStorage")
 }
  
}

module.exports = models