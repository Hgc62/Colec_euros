'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.createTable('Usuarios',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING,
            unique: { msg: "Nombre ya existe"},
            allowNull: false,
            validate: {
                isAlphanumeric: { args: true, msg: "nombre: caracteres no válidos"},
                notEmpty: {msg: "nombre no puede estar vacío."}
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {notEmpty: {msg: "Password no puede estar vacío."}}
        },
        salt: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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
    return queryInterface.dropTable('Usuarios');
  }
};
