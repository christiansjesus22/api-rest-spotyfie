//importamos sequelize que nos permitira conectarnos con la base de datos sql
const {Sequelize} = require ("sequelize")
// importamos nuestra variable de entorno
require('dotenv').config()

//definimos la variables de conexion para la base de datos
const dataBase = process.env.MYSQL_DATABASE
const dbUsermane = process.env.MYSQL_USER
const dbPassword = process.env.MYSQL_PASSWORD
const dbHost = process.env.MYSQL_HOST

//difinimos la nueva instaancia de sequelize
const sequelize = new Sequelize(
    dataBase,
    dbUsermane,
    dbPassword,
    {
        dbHost,
        dialect : "mysql"
    }
)

//realizamos la conexion con la base de datos
const dbConnectMySql = async () =>{

try {
    await  sequelize.authenticate()
    console.log ("CONEXION ESTABLECIDA CON LA BASE DE DATOS SQL")
    
} catch (error) {
    console.log ("ERROR DE CONEXION! SQL ",error)
}

}

module.exports = {dbConnectMySql,sequelize}
