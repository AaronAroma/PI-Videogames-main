const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FechaDeLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });
};
