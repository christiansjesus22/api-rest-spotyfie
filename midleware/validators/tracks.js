const { check } = require("express-validator")
//importando funcion error catch
const validationResults = require ('../../utils/handleValitator')

// importamos nuestra variable de entorno
require('dotenv').config()
//selector de motor de base de datos
const ENGINE_DB = process.env.ENGINE_DB

var validatorCreateItem = []

//verificando motor de base de datos para definir el tipo de validadores
if (ENGINE_DB === "nosql") {

  //validadores para mongo
  validatorCreateItem = [
                                    //mensajes de error test
    check("name").exists().notEmpty().withMessage('debe adicionar un nombre'),
    check("album").exists().notEmpty().withMessage('debe adicionar un album'),
    check("url").exists().notEmpty().withMessage('debe adicionar un cover'),
    check("artist").exists().notEmpty().withMessage('debe adicionar un artista'),
    check("artist.name").exists().notEmpty().withMessage('debe adicionar un artista'),
    check("artist.nickname").exists().notEmpty().withMessage('debe adicionar un sobre nombre del artista'),
    check("artist.nationality").exists().notEmpty().withMessage('debe adicionar una nacionalidad para el artista'),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty(),
    check("duration.end").exists().notEmpty(),
    check("mediaId").exists().notEmpty(),
    check("songId").exists().notEmpty(),
    
    (req,res,next) => {
      return validationResults (req,res,next)
    }
    ];
  
} 
else {

  //validadores para sql
  validatorCreateItem = [
  //mensajes de error test
check("name").exists().notEmpty().withMessage('debe adicionar un nombre'),
check("album").exists().notEmpty().withMessage('debe adicionar un album'),
check("artist_name").exists().notEmpty().withMessage('debe adicionar un artista'),
check("artist_nickname").exists().notEmpty().withMessage('debe adicionar un sobre nombre del artista'),
check("artist_nationality").exists().notEmpty().withMessage('debe adicionar una nacionalidad para el artista'),
check("duration_start").exists().notEmpty(),
check("duration_end").exists().notEmpty(),
check("mediaId").exists().notEmpty(),   
 check("songId").exists().notEmpty(),


(req,res,next) => {
return validationResults (req,res,next)
}
];
  
}

//validacion de id
const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req,res,next) => {
    return validationResults (req,res,next)
  }
  
]

const validatorSearch = [
  check("name").exists().notEmpty(),
  (req,res,next) => {
    return validationResults (req,res,next)
  }
  
]

module.exports = {validatorCreateItem,validatorGetItem,validatorSearch}
