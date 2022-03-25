'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('Coleccion',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        ceca: {
          type: Sequelize.STRING(1),
          //primaryKey: true,
          //unique: "compositeKey",
          validate: {
              isIn: [['A', 'F', 'G', 'J', 'D','', 'null']],
          }
        },
        año: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          //primaryKey: true,
          //unique: "compositeKey",
          validate: {
              isInt: true,
              min: {args: [1999], msg: "Año debe de ser mayor que 1999"}
          }
        },
        moneda: {
          type: Sequelize.STRING,
          //primaryKey: true,
          //unique: "compositeKey",
          unique: "compositeKey",
          validate: {
              isIn: [['1c', '2c', '5c', '10c', '20c', '50c', '1€', '2€', '12€_1', '12€_2', '2€ Com1', '2€ Com2', '2€ Com3']]
          }
        },
        coleccionistaId: {
          type: Sequelize.INTEGER,
          //primaryKey: true,
          //unique: "compositeKey",
          references: {
            model: "Usuarios",
            key: "id"
          },
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE'
        },
        paisId: {
          type: Sequelize.INTEGER,
          //primaryKey: true,
          //unique: "compositeKey",
          references: {
            model: "Paises",
            key: "id"
          },
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE'
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
    return queryInterface.dropTable('Coleccion');
  }
};
