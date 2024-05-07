//importando instanciamiento de sequelize 
const { sequelize } = require("../../config/mySql.js")
//importamos el tipo de dato que va a contener cada elemento la tabla users
const { DataTypes } = require("sequelize")
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
    url: {
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



//implementando asociacion con songStorage (canciones)
//implementando metodo de obtener todos los elementos
tracks.findAllData = function () {
  tracks.belongsTo(songStorage, {
    foreignKey: "songId",
  });
  return tracks.findAll({ include:songStorage });
};

//implementando metodo de obtener objeto por id
tracks.findOneData = function (id) {
  tracks.belongsTo(songStorage, {
    foreignKey: "songId",
  });
  return tracks.findOne({ where: { id }, include:songStorage});
};



//implementando asociacion con storage (imagenes)
//implementando metodo de obtener todos los elementos
tracks.findAllData = function () {
  tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return tracks.findAll({ include:Storage });
};

//implementando metodo de obtener objeto por id
tracks.findOneData = function (id) {
  tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
  });
  return tracks.findOne({ where: { id }, include:Storage});
};


module.exports = tracks