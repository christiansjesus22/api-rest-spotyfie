//para defini un modelo en mongoose
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false

        },
        role: {
            type: ["user", "admin"],
            default: "user"
        }
    }
    ,

    {
      timestamps:true, // tiempo de creacion, tiempo de actualizacion
      versionKey:false

    }
)
 //cuando exportamos un modelo de moongose, debemos definir el nombre del modelo seguido del nombre del esquema quedando nombremodels
  module.exports = mongoose.model("users", UserSchema)