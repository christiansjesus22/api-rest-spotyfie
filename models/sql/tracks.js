//importando instanciamiento de sequelize 
const { sequelize } = require("../../config/mySql.js")
//importamos el tipo de dato que va a contener cada elemento la tabla users
const { DataTypes,Op } = require("sequelize")
//importando modelo storage
const Storage =  require ("./storage.js")
//importando modelo songStorage
const songStorage =  require ("./songStorage.js")

const tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
    songId: {
      type: DataTypes.STRING,
    },

  },
  {
    timestamps: true,
  }
)

//creamos la relacion con las tablas
tracks.belongsTo(songStorage, {foreignKey: "songId",})
tracks.belongsTo(Storage, {foreignKey: "mediaId",});


//implementando metodo personalizado de obtener todos los elementos 
tracks.findAllData = function () {  
  //implementando relacion
  tracks.belongsTo(songStorage, {
    foreignKey: "songId",
  });tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return tracks.findAll({ include:[Storage,songStorage] });
};

//implementando metodo personalizado de obtener objeto por id
tracks.findOneData = function (id) {
  tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  tracks.belongsTo(songStorage, {
    foreignKey: "songId",
  })

 return tracks.findOne({ where: { id }, include:[Storage,songStorage]});
};


module.exports = tracks