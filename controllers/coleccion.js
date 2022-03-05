const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {models} = require("../models");
//const attHelper = require("../helpers/attachments");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { where } = require("sequelize");


// Autoload la moneda de la coleccion asociad a :monedaId
exports.load = async (req, res, next, monedaId) => {

    try {
        const moneda = await models.Coleccion.findByPk(monedaId);
        if (moneda) {
            req.load = {...req.load, moneda};
            next();
        } else {
            throw new Error('No existe una moneda con Id=' + monedaId);
        }
    } catch (error) {
        next(error);
    }
};

// GET coleccion
exports.index =async (req, res, next) => {

    try {
        res.render('coleccion/index.ejs');
    } catch (error) {
        next(error);
    }
};

// GET /coleccion/formulario
exports.formulario = async (req, res, next) => {
    const {query} = req;
    const tipo = query.tipo || '';
    try {
        const paises = await models.Paises.findAll();
        const usuarios = await models.Usuario.findAll();
        res.render('coleccion/formulario', {paises, usuarios, tipo});
    } catch (error) {
        next(error);
    }
};

// GET /coleccion/show
exports.show = async (req, res, next) => {
    let options = {
        where: {},
        include: []
    };

    const {query} = req;
    const tipo = query.tipo || '';
    const coleccionista = query.coleccionista || '';
    const pais = query.pais || '';
    const ceca = query.ceca || '';
    const valor = query.valor || '';
    const año = query.año || '';

    if (pais === "Alemania") {
        if (ceca) options.where.ceca = ceca;
    }
    
    if (!tipo) {  
        if ((valor) && (valor === "12€")) {
            options.where.moneda = {[Op.like]: '12€_%'}
        } else if (valor){
            options.where.moneda = valor;
        }
    } else {
        options.where.moneda = {[Op.like]: '2€ Com%'}
    }

    if (año) options.where.año = año;

    if (coleccionista) {
        options.include.push({
        model: models.Usuario,
        as: "coleccionista",
        where: {nombre: coleccionista}
        });
    } else {
        options.include.push({
        model: models.Usuario,
        as: "coleccionista"
        });   
    }

    if (pais) {
        options.include.push({
        model: models.Paises,
        as: "pais",
        where: {nombre: pais}
        });
    } else {
        options.include.push({
        model: models.Paises,
        as: "pais"
        });   
    }

    try {
        const coleccion = await models.Coleccion.findAll(options);
        res.render('coleccion/show', {coleccion, tipo});
    } catch (error) {
        next(error);
    }
};

// GET /coleccion/new
exports.new = async (req, res, next) => {
    const {query} = req;
    const tipo = query.tipo || '';
    try {
        const paises = await models.Paises.findAll();
        const usuarios = await models.Usuario.findAll();
        res.render('coleccion/new', {paises, usuarios, tipo});
    } catch (error) {
        next(error);
    }
};

/*
// GET /coleccion/series/:monedaId(\\d+)/edit
exports.edit_series = async (req, res, next) => {

    const {moneda} = req.load;

    try {

        //res.render('monedas/show', {pais});
    } catch (error) {
        next(error);
    }
};
*/

// POST /coleccion    create
exports.create = async (req, res, next) => {
        
    let {coleccionista, pais, ceca, valor, año, tipo} = req.body;
    //if ((coleccionista && pais && valor && año) && (pais === "Alemania" && ceca) ){
    if (pais === "Alemania" ? (coleccionista && pais && valor && año && ceca) : (coleccionista && pais && valor && año)  ){
        
        let options = {
            where: {},
            include: []
        };
    
        if ((ceca) && pais === "Alemania") { 
            options.where.ceca = ceca;
        } else {
            options.where.ceca = '';
            ceca = '';
        };

        options.where.moneda = valor;

        options.where.año = año;
        
        options.include.push({
            model: models.Usuario,
            as: "coleccionista",
            where: {nombre: coleccionista}
        });

        options.include.push({
            model: models.Paises,
            as: "pais",
            where: {nombre: pais}
        });
        
        try {
            let usuario_moneda = await models.Usuario.findAll ({where: {nombre: coleccionista}});
            const id_coleccionista = usuario_moneda[0].id;

            let pais_moneda = await models.Paises.findAll({where: {nombre: pais}});
            const id_pais = pais_moneda[0].id;

            const moneda_nueva = await models.Coleccion.findAll(options);
            if (!moneda_nueva[0]) {
                        
                const moneda = await models.Coleccion.create({
                    ceca: ceca,
                    año: Number(año),
                    moneda: valor,
                    coleccionistaId: id_coleccionista,
                    paisId: id_pais
                });

                const coleccion = await models.Coleccion.findAll(options);
                        
                res.render('coleccion/show', {coleccion, tipo});

            } else {
                //Mensaje flash de que la moneda ya existe
                    console.log('La moneda ya existe');
                if (tipo) {   
                    res.redirect('/coleccion/new?tipo=conmemorativa');
                } else {
                    res.redirect('/coleccion/new');
                }
            }

        } catch (error) {
            if (error instanceof Sequelize.ValidationError) {
                console.log('Hay un error en el formato de los datos');
                error.errors.forEach(({message}) => console.log(message));
            } else {
                next(error)
            } 
                    
                    
        } 
            
    } else {
        // ¿Mensaje flash de que no pueden ser campos vacíos salvo CECA si no es Alemania?
        console.log('Los campos no pueden estar vacíos, salvo el campo CECA si elpais no es Alemania');
        if (tipo) {   
            res.redirect('/coleccion/new?tipo=conmemorativa');
        } else {
            res.redirect('/coleccion/new');
        } 
    }

};

        /*
// PUT /coleccion/series/:monedaId(\\d+)
exports.update_series = async (req, res, next) => {

    const {moneda} = req.load;

    try {

        //res.render('monedas/show', {pais});
    } catch (error) {
        next(error);
    }
};
*/

// DELETE /coleccion/:monedaId(\\d+)
exports.destroy = async (req, res, next) => {

    const {moneda} = req.load;

    try {
        await req.load.moneda.destroy();
        res.redirect('/coleccion')
        //res.render('monedas/show', {pais});
    } catch (error) {
        next(error);
    }
};
