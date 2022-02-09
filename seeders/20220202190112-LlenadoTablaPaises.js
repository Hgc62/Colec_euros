"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Paises", [
      {
        pais: "España",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Alemania",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Austria",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Belgica",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Finlandia",
        num_series: "1",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Francia",
        num_series: "1",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Grecia",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Holanda",
        num_series: "2",
        año_inicio: "1999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Irlanda",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Italia",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Luxemburgo",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Portugal",
        num_series: "1",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Eslovenia",
        num_series: "1",
        año_inicio: "2007",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Malta",
        num_series: "1",
        año_inicio: "2008",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Andorra",
        num_series: "1",
        año_inicio: "2014",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Eslovaquia",
        num_series: "1",
        año_inicio: "2009",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Estonia",
        num_series: "1",
        año_inicio: "2011",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Letonia",
        num_series: "1",
        año_inicio: "2014",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Lituania",
        num_series: "1",
        año_inicio: "2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Chipre",
        num_series: "1",
        año_inicio: "2008",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Monaco",
        num_series: "2",
        año_inicio: "2001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "San_Marino",
        num_series: "2",
        año_inicio: "2002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pais: "Vaticano",
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
