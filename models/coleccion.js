
const {Model} = require('sequelize');

// Definición del modelo de la colección:

module.exports = (sequelize, DataTypes) => {

    class Coleccion extends Model {}

    Coleccion.init(
        { 
          ceca: {
            type: DataTypes.STRING(1),
            validate: {
                isIn: [['A', 'F', 'G', 'J', 'D', '', 'null']],
            }
          },
          año: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                isInt: true,
                min: {args: [1999], msg: "Año debe de ser mayor que 1999"}
            }
          },
          moneda: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['1c', '2c', '5c', '10c', '20c', '50c', '1€', '2€', '12€_1', '12€_2', '2€ Com1', '2€ Com2', '2€ Com3']]
            }
          }
        },
        {sequelize, tableName:"Coleccion"}
    );

    return Coleccion;
};
