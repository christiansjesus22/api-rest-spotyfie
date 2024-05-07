// importando manejador de errores
const {handleHttpError} = require("../utils/handleError")




//funcion que recibe dobles argumentos
const checkRol = (roles) =>  async (req, res, next) => {
  
    try {
        const {user} = req
        console.log ({user})
        //consiguiendo el rol que posee el usuario
        const rolesByUser = user.role //["user,admin, manager"] 
        //verificando si en el array de roles que posee el usuario  incluye el rolSingle el cual definimos en la ruta siendo ["admin"] de tracks
        const checkValueRol = roles.some((roleSingle) => rolesByUser.includes(roleSingle) ) //devuelve un booleano

         if (!checkValueRol) {
            handleHttpError(res, "USER_NOT_ROL_PERMISSIONS",403)
            return
         }
        next ()

    } catch (error) {
        handleHttpError(res, "ERROR_ROL_PERMISSIONS",403)
        console.log (error)
        return
    }

}

module.exports = {checkRol}