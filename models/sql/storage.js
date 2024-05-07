const {sequelize} = require ("../../config/mySql")
const {DataTypes} = require ("sequelize")
 
const storage = sequelize.define(
    "storages",
    {
        url:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        filename:{
            type: DataTypes.STRING
        }
    },
    {
        //forma de definir el create at y el update at 
        timestamps: true

    }
)

module.exports = storage