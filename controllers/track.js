const {tracksModel}= require("../models")
// importamos macheddata que nos permite filtrar la informacion que entra desde el body, para hacer uso unicmente de los valores que estan en el modelo
const { matchedData } = require("express-validator");
//manejador de errores del h
const { handleHttpError } = require("../utils/handleError");


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

//funcion obtener 1 item
const getItem =  async (req, res) =>{
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.findOneData(id);
    res.send({ data });
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
    console.log ("cancion creada")

  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEMS");
    console.log (error)
  }
};

//funcion eliminar 1 item
const  deleteItem = async (req, res) =>{
  try{
    req = matchedData(req);
    const {id} = req;
    const data = await tracksModel.deleteOne({_id:id});
    res.send({ data });
    console.log ("cancion elimiminada")
  }catch(e){
    handleHttpError(res,"ERROR_DELETE_ITEM")
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



module.exports = { getItems,getItem,createItem,deleteItem,updateItem}