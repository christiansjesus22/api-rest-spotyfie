// importamos express como provveedor del servidor 
const express = require ("express")
//importando funciones desde el controlador
const { getItems, createItem,getItem,updateItem,deleteItem} = require("../controllers/track")
//importamos el router que se encarga de manejar las rutas
const router = express.Router()
// importando midleware de validacion 
const {validatorCreateItem, validatorGetItem} = require ("../midleware/validators/tracks")
//importando midleware de verificacion de token
const {sessionsMidleware} = require ("../midleware/sessions")
//importando midleware de verificion del rol de usuario
const {checkRol} = require ("../midleware/rol")

//generando las rutas del crud pertenecientes del modelo

//obtener todos los items
router.get("/",sessionsMidleware, getItems)
//obtener 1 item
router.get("/:id",sessionsMidleware,validatorGetItem, getItem)
//crear un item                     //definimos el rol que tendra permitido crear items
router.post("/", sessionsMidleware,checkRol(["admin"]),validatorCreateItem, createItem)
//actualizar un item
router.put("/:id" ,sessionsMidleware,validatorGetItem,validatorCreateItem,updateItem)
//eliminar un item
router.delete("/:id",sessionsMidleware,validatorGetItem,deleteItem)

module.exports = router
