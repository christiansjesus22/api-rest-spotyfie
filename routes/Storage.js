const express = require ("express")
const uploadMidleware = require("../utils/habdleStorage") 
//importando controladores
const {  getItems,getItem,createItem,deleteItem} = require("../controllers/storage")
//importando manejador de rutas
const router = express.Router()
//importando validador de id.
const { validatorGetItem } = require("../midleware/validators/tracks")
//importando verificador de roles
const {checkRol} = require ("../midleware/rol")
//importando midleware de verificacion de token
const {sessionsMidleware} = require ("../midleware/sessions")
///generando las rutas del crud pertenecientes del modelo

//subir archivo
router.post("/",sessionsMidleware, checkRol(["admin"]),uploadMidleware.single("myFile"), createItem)

//obtener  un archivo
router.get("/:id",validatorGetItem,getItem)

//obtener todos los archivos
router.get("/",getItems)

//eliminar un archivo
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router
