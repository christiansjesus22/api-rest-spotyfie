const { check } = require("express-validator")
//importando funcion error catch
const validationResults = require ('../../utils/handleValitator')



//creando validaciones de la ruta auth 

//validacion registrar usuario
const validatorRegister= [
  check("name").exists().notEmpty().isLength({min:3, max:99}).withMessage("usuario invalido"),
  check("age").exists().notEmpty().isNumeric().withMessage(" edad invalida"),
  check("email").exists().notEmpty().isEmail().withMessage("email invalido"),
  check("password").exists().notEmpty().isLength({min:3, max:15}).withMessage("contrasenha invalida"),

  (req,res,next) => {
    return validationResults (req,res,next)
  }
  
]
//validacion login de usuario
const validatorLogin= [
    check("password").exists().notEmpty().isLength({min:3, max:15}),
    check("email").exists().notEmpty().isEmail(),
  
    (req,res,next) => {
      return validationResults (req,res,next)
    }
    
  ]
  
module.exports = {validatorRegister, validatorLogin}