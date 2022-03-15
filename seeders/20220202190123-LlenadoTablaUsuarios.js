"use strict";

var crypt = require('../helpers/crypt');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Usuarios", [
      {
        nombre: "admin",
        password: crypt.encryptPassword("3213", "aaaa"),
        salt: "aaaa",
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Honorato",
        password: crypt.encryptPassword("1111", "bbbb"),
        salt: "bbbb",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Paula",
        password: crypt.encryptPassword("2222", "cccc"),
        salt: "cccc",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Joaquin",
        password: crypt.encryptPassword("3333", "dddd"),
        salt: "dddd",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Maria",
        password: crypt.encryptPassword("4444", "eeee"),
        salt: "eeee",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Invitado",
        password: crypt.encryptPassword("5555", "ffff"),
        salt: "ffff",
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Usuarios", null, {});
  },
};
