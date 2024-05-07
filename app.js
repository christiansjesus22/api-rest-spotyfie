
// llamamos la paqueteria  express para levantar un servidor
const express = require ("express")
// llamamos la paqueteria de cors que permite evitar errores de origen cruzado
const cors = require ("cors")


// importamos la conexion con la base de datos mongo
const dbConnectMongo = require("./config/mongo")
// importamos la conexion con la base de datos mysql
const {dbConnectMySql} = require ("./config/mySql.js")


// importamos nuestra variable de entorno
require('dotenv').config()
//importando morgan  body que permite intersectar las respuestas de la api
const morganBody = require ("morgan-body")
//importando manejador de logger 
const {loggerStream} = require ("./utils/handleLogger")
//importando selector de base de datos 
const ENGINE_DB = process.env.ENGINE_DB


const app =  express()
//decimos que app haga uso de cors
app.use(cors())
//llamamos express para que este preparado para recibir objetos json post
app.use(express.json())
// llamamos a express para visulizar los archivos estaticos
app.use (express.static("storage"))




// haciendo uso del morgan-body para monitorear los errores
morganBody(app, {
//esta propiedad elimina los colores en la respuesta    
noColors:true,
//mensaje de respuesta capturado
stream:loggerStream,
//funcion  de omitir respuestas correctas
skip: function (req,res) {
    //decimos que solo enviara respuesta cuando el codigo de respuesta dea mayor al 400
    return res.statusCode <400 //pq todos numero de respuesta mayores a 400 son errores   
}
})

// definimos  el puerto desde la variable de entorno
const port = process.env.PORT

//invocando las rutas
app.use ("/api",require ("./routes"))

//funcion  inicial 
app.listen(port,()=> {
    console.log ('escuchando por el puerto',port)
})


//verificamos cual va a ser el la base de datos y nos conectamos a ella
if (ENGINE_DB === 'nosql') {
    //mongo
    dbConnectMongo()
} else {
    //mysql
    dbConnectMySql()
}
