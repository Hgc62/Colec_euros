"use strict";

const {Model} = require('sequelize');
const crypt = require('../helpers/crypt');

// Definition of the User model:

module.exports = function (sequelize, DataTypes) {

    class Usuario extends Model {

        verifyPassword(password) {
            return crypt.encryptPassword(password, this.salt) === this.password;
        }

        get displayName() { 
                return `${this.nombre}`;
            }
        
    }

    Usuario.init({
            nombre: {
                type: DataTypes.STRING,
                unique: { msg: "Nombre ya existe"},
                allowNull: false,
                validate: {
                    isAlphanumeric: { args: true, msg: "nombre: caracteres no válidos"},
                    notEmpty: {msg: "nombre no puede estar vacío."}
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Password no puede estar vacío."}},
                set(password) {
                    // Random String used as salt.
                    this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
                    this.setDataValue('password', crypt.encryptPassword(password, this.salt));
                }
            },
            salt: {
                type: DataTypes.STRING
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize
        }
    );

    return Usuario;
};
