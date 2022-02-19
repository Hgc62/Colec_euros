"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Paises", [
      {
        nombre: "España",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Alemania",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Austria",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Belgica",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Finlandia",
        num_series: "1",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Francia",
        num_series: "1",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Grecia",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Holanda",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Irlanda",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Italia",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Luxemburgo",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Portugal",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Eslovenia",
        num_series: "1",
        año_inicio: "2007",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Malta",
        num_series: "1",
        año_inicio: "2008",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Andorra",
        num_series: "1",
        año_inicio: "2014",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Eslovaquia",
        num_series: "1",
        año_inicio: "2009",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Estonia",
        num_series: "1",
        año_inicio: "2011",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Letonia",
        num_series: "1",
        año_inicio: "2014",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Lituania",
        num_series: "1",
        año_inicio: "2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Chipre",
        num_series: "1",
        año_inicio: "2008",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Monaco",
        num_series: "2",
        año_inicio: "2001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "San_Marino",
        num_series: "2",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Vaticano",
        num_series: "5",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Paises", null, {});
  },
};
