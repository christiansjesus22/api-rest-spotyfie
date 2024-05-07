const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
     //accediendo a la extencion del archivo
    // en la siguiente funcion estamos accediendo al nombre del archivo y separando a partir del ultimo punto de este por ejempo captura.02.png --> tomaremos unicamente el png con el .pop
    const ext = file.originalname.split(".").pop();
    // ahora moodificamos el nombre del archivo para adicionarle la fecha de creacion evitando tener 2 archivos con el mismo nombre, la funcion de date.now devuelve la fecha en formato unix 
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});


const uploadMidleware = multer({storage:storage})

module.exports = uploadMidleware