const {tracksModel}= require("../models")
// importamos macheddata que nos permite filtrar la informacion que entra desde el body, para hacer uso unicmente de los valores que estan en el modelo
const { matchedData } = require("express-validator");
//manejador de errores del http
const { handleHttpError } = require("../utils/handleError");
const Sequelize = require('sequelize');
const Storage =  require ("../models/sql/storage.js")
//importando modelo songStorage
const SongStorage =  require ("../models/sql/songStorage.js")



//funcion obtener todos los items
const getItems = async (req, res) =>{
  try {
    const user = req.user
    const data = await tracksModel.findAllData({})
    //mandando el usuario que solicito la peticion
     res.send ({data:data,user})

  } catch (error) {
    handleHttpError(res, "ERROR_GETING_ITEMS");
    console.log (error)
  }

}

//funcion obtener elementos dependiendo del nombre 
const searchItem = async (req, res) => {
  try {
    req = matchedData(req);
    const name = req.name;

    const filteredData = await tracksModel.findAll({
      where: {
        // Utilizamos Sequelize.Op.like para buscar la palabra en cualquier parte con la propiedad name
        name: {
          [Sequelize.Op.like]: `%${name}%`
        }
      },include:[Storage,SongStorage] // incluimos las 2 tablas ya relacionadas
    });

    res.send(filteredData);

  } catch (error) {
    handleHttpError(res, "ERROR_GETTING_ITEM");
    console.log(error);
  }
}


//funcion obtener 1 item
const getItem =  async (req, res) =>{
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findByPk(id);
    res.send({data:data});
  }catch(error){
    handleHttpError(res,"ERROR_GETING_ITEM")
    console.log (error)
  }
}


//funcion crear 1 item
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.status(201);
    res.send({ data });

  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

//funcion eliminar 1 item
const  deleteItem = async (req, res) =>{
  try{
   const id = req.params.id;  
   const deleteData= await tracksModel.destroy( {where:{id:id}});
   res.send({ deleteData });
   res.status(201);
  }catch(error){
    handleHttpError(res,"ERROR AL BORRAR UNA CANCION")
  }
}

//funcion actualizar  1 item
const updateItem = async (req, res) =>{
  try {
    //con destructuracion de js podemos separar el id y el body en 2 variables
    const {id, ...body} = matchedData(req)
    const data = await tracksModel.findOneAndUpdate( id, body);
    console.log ("informacion actualizada")

    res.status(201);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }

}



module.exports = { getItems,getItem,createItem,deleteItem,updateItem,searchItem}