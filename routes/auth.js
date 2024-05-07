const express = require ("express")
//importando manejador de rutas
const router = express.Router()
//importando validador de registro y login
const { validatorLogin,validatorRegister } = require("../midleware/validators/auth")
//importando controladores de la ruta auth
const {CrateUser,loginUser} =require ("../controllers/auth")


//creando registro de usuario
router.post("/register", validatorRegister,CrateUser )
//login del usuario
router.post("/login", validatorLogin,loginUser )


module.exports = router