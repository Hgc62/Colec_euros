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
          validate: {
              isIn: [['A', 'F', 'G', 'J', 'D']],
          }
        },
        año: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          validate: {
              isInt: true,
              min: {args: [1999], msg: "Año debe de ser mayor que 1999"}
          }
        },
        moneda: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isIn: [['1c', '2c', '5c', '10c', '20c', '50c', '1€', '2€', '12€', '2€ com1', '2€ com2', '2€ com3']]
          }
        },
        coleccionistaId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Usuarios",
            key: "id"
          },
          OnUpdate: 'CASCADE',
          OnDelete: 'CASCADE'
        },
        paisId: {
          type: Sequelize.INTEGER,
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
