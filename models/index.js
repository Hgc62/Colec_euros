const path = require('path');

// Load ORM
const Sequelize = require('sequelize');


// Environment variable to define the URL of the data base to use.
// To use SQLite data base:
//    DATABASE_URL = sqlite:colec_euros.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:colec_euros.sqlite";

const sequelize = new Sequelize(url);

// Import la definición de la tabla Coleccion  de coleccion.js
const Coleccion = sequelize.import(path.join(__dirname, 'coleccion'));

// Import la definición de la tabla paises  de paises.js
const Paises = sequelize.import(path.join(__dirname, 'paises'));

// Import la definición de la tablas de usuarios de use.js 
const Usuario = sequelize.import(path.join(__dirname,'usuario'));

// Import the definition of the Attachments Table from attachment.js
//const Attachment = sequelize.import(path.join(__dirname,'attachment'));

// Session
//sequelize.import(path.join(__dirname,'session'));


//Relaciones con la tabla coleccion

Coleccion.belongsTo(Usuario, {
  as: "coleccionista",
  foreignKey: "coleccionistaId",
  onDelete: "CASCADE"
});
Usuario.hasMany(Coleccion, {
  as: "monedasCol",
  foreignKey: "coleccionistaId",
});

Coleccion.belongsTo(Paises, {
  as: "pais",
  foreignKey: "paisId",
  onDelete: "CASCADE"
});

Paises.hasMany(Coleccion, {
    as: "paisCol",
    foreignKey: "paisId",
  });

module.exports = sequelize;
