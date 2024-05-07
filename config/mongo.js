//IMPORTAMOS MONGOOSE PARA CREAR LA CONEXION CON LA BASE DE DATOS
const mongoose = require('mongoose');
//HAY QUE IMPORTAR LAS VARIABLES DE ENTORNO DONDE SEA QUE VAYAN A SER USADAS
require('dotenv').config()

 
const dbConnectMongo = () => {
    const DB_URI = process.env.DB_URI;
    mongoose
      .connect(DB_URI)
      .catch((error) => {
        console.log(" ERROR DE CONEXION! MONGO", error);
      })
      .then(() => {
        console.log("CONEXION ESTABLECIDA CON LA BASE DE DATOS MONGO");
      });
  };
module.exports = dbConnectMongo