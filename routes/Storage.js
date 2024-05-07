const express = require ("express")
const uploadMidleware = require("../utils/habdleStorage") 
//importando controladores
const {  getItems,getItem,createItem,deleteItem} = require("../controllers/storage")
//importando manejador de rutas
const router = express.Router()
//importando validador de id.
const { validatorGetItem } = require("../midleware/validators/tracks")

///generando las rutas del crud pertenecientes del modelo

//subir archivo
router.post("/",uploadMidleware.single("myFile"), createItem)

//obtener  un archivo
router.get("/:id",validatorGetItem,getItem)

//obtener todos los archivos
router.get("/",getItems)

//eliminar un archivo
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router
