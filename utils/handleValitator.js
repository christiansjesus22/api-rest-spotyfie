const {validationResult} = require ("express-validator")

const validationResults = (req,res,next) =>{
try {
    validationResult(req).throw()
    return next() // continua la funcion 
    
} catch (err) {
    res.status(403) 
    res.send ({error: err.array()})

//capturando el mensaje del validator 
const errorMessages = []
err.array().map(err => errorMessages.push(err.msg))
console.log ("los errores del validator son: ==>",errorMessages)
}
}

module.exports = validationResults
