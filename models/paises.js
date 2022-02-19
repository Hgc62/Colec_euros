
const {Model} = require('sequelize');

// Definición del modelo de paises:

module.exports = (sequelize, DataTypes) => {

    class Paises extends Model {}

    Paises.init(
        { nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: { args: true, msg: "pais: caracteres no válidos"}
            }
          },
          num_series: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                isInt: true,
            }
          },
          año_inicio: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                isInt: true,
                min: {args: [1999], msg: "Año debe de ser mayor que 1999"}
            }
          }
        },
        {sequelize, tableName:"Paises"}
    );

    return Paises;
};
