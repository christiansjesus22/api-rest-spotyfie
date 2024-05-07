//importando libreria de encripacion
const bcryptjs = require ("bcryptjs")

//funcion encriptado de contrasenha
const encrypt = async (passwordPlain) =>{
// lo que hace la funcion es ingresar la contrasenha, seguida del numero que se encargara de aleatorizar ? el texto ingresado.
const hash = await bcryptjs.hash (passwordPlain, 5) // password => asdlm24f
 return hash 
}

//funcion comparar encriptacion
const compare = async (passwordPlain, hashpassword) =>{
return await bcryptjs.compare (passwordPlain, hashpassword)


}

module.exports = {encrypt, compare}