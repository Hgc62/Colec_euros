'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Paises',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        pais: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isAlphanumeric: { args: true, msg: "pais: caracteres no válidos"}
          }
        },
        num_series: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          validate: {
              isInt: true,
          }
        },
        año_inicio: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          validate: {
              isInt: true,
              min: {args: [1999], msg: "Año debe de ser mayor que 1999"}
          }
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        sync: {force: true}
    } 
);
  },
  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Paises');
  }
};
