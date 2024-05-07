// express-validator import
const { check, validationResult } = require('express-validator'); 
const validationResults = require ('../../utils/handleValitator')

// multer import and setup
const multer = require('multer');
const storage = multer.memoryStorage(); // Holds a buffer of the file in memory
const upload = multer({ storage: storage });


const post_file = [
// multer middleware
upload.single('myFile'),

// express-validator middleware
check('filename')
.custom((value, {req}) => {
        if(req.file === 'mimetype'){
            return '.mp3'; // return "non-falsy" value to indicate valid data"
        }else{
            return false; // return "falsy" value to indicate invalid data
        }
    })
.withMessage('Please only submit pdf documents.'), // custom error message that will be send back if the file in not a pdf. 


// process the request with validated user inputs
(req,res,next) => {
    return validationResults (req,res,next)
    }
]


module.exports =  post_file