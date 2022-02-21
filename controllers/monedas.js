const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {models} = require("../models");
//const attHelper = require("../helpers/attachments");
const req = require("express/lib/request");
const res = require("express/lib/response");


// Autoload el pais asociado a :paisId
exports.load = async (req, res, next, paisId) => {

    try {
        const pais = await models.Paises.findByPk(paisId);
        if (pais) {
            req.load = {...req.load, pais};
            next();
        } else {
            throw new Error('No existe un pais con Id=' + paisId);
        }
    } catch (error) {
        next(error);
    }
};


// GET monedas
exports.index =async (req, res, next) => {

    try {
        const paises = await models.Paises.findAll();
        res.render('monedas/index.ejs', {paises});
    } catch (error) {
        next(error);
    }
};


// GET /monedas/:paisId
exports.show = async (req, res, next) => {

    const {pais} = req.load;

    try {

        res.render('monedas/show', {pais});
    } catch (error) {
        next(error);
    }
};

// GET /monedas/:paisId/series
exports.show_series = async (req, res, next) => {

    const {pais} = req.load;

    try {

        res.render('monedas/show_series', {pais});
    } catch (error) {
        next(error);
    }
};

// GET /monedas/:paisId/conme
exports.show_conme = async (req, res, next) => {

    const {pais} = req.load;

    try {

        res.render('monedas/show_conme', {pais});
    } catch (error) {
        next(error);
    }
};