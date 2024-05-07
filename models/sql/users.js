//importando instanciamiento de sequelize 
const { sequelize } = require("../../config/mySql.js")
//importamos el tipo de dato que va a contener cada elemento la tabla users
const { DataTypes } = require("sequelize")

const users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.NUMBER,
      },
      email: {
        type: DataTypes.STRING,
      },
      //pilas con la encriptacion de la contrasenha pq tienes que calcular en la base de datos cuantos caracteres puede contener.....
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM(["user", "admin"]),
      },
    },
    {
        timestamps: true,    
    }
  );

module.exports = users



