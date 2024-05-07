const express = require ("express")
const uploadSongMidleware = require("../utils/handleSongStorage") 
//importando controladores
const {  getItems,getItem,createItem,deleteItem} = require("../controllers/songStorage")
//importando manejador de rutas
const router = express.Router()
//importando validador de id.
const { validatorGetItem } = require("../midleware/validators/tracks")
//importando validador de extencion
const { post_file } = require("../midleware/validators/storage")

///generando las rutas del crud pertenecientes del modelo

//subir archivo
router.post("/", uploadSongMidleware.single("myFile"), createItem)

//obtener  un archivo
router.get("/:id",validatorGetItem,getItem)

//obtener todos los archivos
router.get("/",getItems)

//eliminar un archivo
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router
