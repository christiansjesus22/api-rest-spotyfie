
// importando manejador de encriptando
const { encrypt, compare } = require("../utils/handlePassword")
const { userModel } = require("../models/index")
//importando creacion del token 
const { tokenSign } = require("../utils/handleJwt")
const { matchedData } = require("express-validator")
//importamos manejador de errores
const { handleHttpError } = require("../utils/handleError");

//controlador de login usuario
const loginUser = async (req, res) => {

    try {
        //pasando la data limpia unicamente con los datos admitidos en el modelo
        req = matchedData(req)
        //buscamos al email del usuario en la base de datos        // aplicamos un filtro para que el password retorne un true temporalmente en el select y pueda ser comprarada
        const user = await userModel.findOne({ where:{ email: req.email }}) //.select('password name role email') //habilitar dependiendo si se va a utilizar mongo como base de datos 
       
      

        //verificamos que exista o no el usuario en la base de datos
        if (!user) {
            handleHttpError(res,"USUARIO NO EXISTE", 404)
            return
        }

        //solicitamos la contrasenha perteneciente al usuario desde la base de datos 
        const hashPassword = user.get('password')
        //comparamos la contrasenha sin encriptar que viene desde el req.password, con la contrasenha encriptada que se encuentra en la base de datos.
        const check = await compare(req.password, hashPassword) //true or false

        //verificamos la compracion entre las contrasenhas
        if (!check) {
            handleHttpError(res,"CONTRASENHA INVALIDA", 401) 
            return
        }
        //una vez hecha la comparacion podemos setear la contrasenha para que no sea visible en la respuesta 
        user.set('password', undefined, { strict: false })

        const data = {
            //generamos el token del login
            token: await tokenSign(user),
            user
        }
         //devolvemos la data con el token y el la informacion del usuario
        res.send({ data })

    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER")
        console.log(error)
    }
}


//controlador de crear usuario
const CrateUser = async (req, res) => {
    try {

        req = matchedData(req)
        // llamamos a la funcion de encriptar la contrasenha
        const password = await encrypt(req.password)
        const body = { ...req, password }
        const dataUser = await userModel.create(body)
        // escondiendo la contrasenha de la respuesta 
        dataUser.set("password", undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data })

    } catch (error) {

        handleHttpError(res, "ERROR_CREATE_USER")
        console.log (error)


    }
}


module.exports = { CrateUser, loginUser }