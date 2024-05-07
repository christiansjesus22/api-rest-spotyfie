require('dotenv').config()
const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;


//funcion obtener todos los items
const getItems = async (req, res) => {
  try {                            //cambiar por find () cuando usemos mongo
    const data = await storageModel.findAll({}); 
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LIST_ITEMS");
    console.log (error)
  }
};


//funcion obtener 1 item
const getItem = async (req, res) =>{
try {
  const {id} = matchedData(req)  // cambiar por findById() cando usemos mongo
  const data = await storageModel.findByPk(id)
    res.send ({data:data})
    
} catch (error) {
  handleHttpError(res,"ERROR_GET_ITEM")
  console.log(error)

}
}

//funcion crear 1 item
const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.status(201);
    res.send({ data });
    console.log ("storage",storageModel)
    console.log (data )
  } catch (error) {
    handleHttpError(res, "ERROR__ITEMS");
    console.log(error)

  }
};

//funcion eliminar 1 item
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);    //cambiar por findById cuando usemos mongo
    const dataFile = await storageModel.findByPk(id);
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`; //carpeta storage + fileName
     //eliminando desde la base de datos
    const data = await storageModel.destroy({ where: { id:id } });
    //eliminando desde la base de datos
    fs.unlinkSync(filePath);
    
    res.send({data});
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
    console.log(error)

  }
};







module.exports = { getItems,getItem,createItem,deleteItem}