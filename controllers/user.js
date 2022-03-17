"use strict";

const Sequelize = require("sequelize");
const {models} = require("../models");
//const attHelper = require("../helpers/attachments");

//const moment = require('moment');

const paginate = require('../helpers/paginate').paginate;
//const authentication = require('../helpers/authentication');


// Autoload the user with id equals to :userId
exports.load = async (req, res, next, userId) => {

    try {
        const user = await models.Usuario.findByPk(userId);
        if (user) {
            req.load = {...req.load, user};
            next();
        } else {
            req.flash('error', 'No hay ususario con este id=' + userId + '.');
            throw new Error('No existe el userId=' + userId);
        }
    } catch (error) {
        next(error);
    }
};

/*
// MW that allows actions only if the user account is local.
exports.isLocalRequired = (req, res, next) => {

    if (!req.load.user.accountTypeId) {
        next();
    } else {
        console.log('Prohibited operation: The user account must be local.');
        res.send(403);
    }
};
*/

// GET /users
exports.index = async (req, res, next) => {

    try {
        const count = await models.Usuario.count();

        // Pagination:

        const items_per_page = 10;

        // The page to show is given in the query
        const pageno = parseInt(req.query.pageno) || 1;

        // Create a String with the HTMl used to render the pagination buttons.
        // This String is added to a local variable of res, which is used into the application layout file.
        res.locals.paginate_control = paginate(count, items_per_page, pageno, req.url);

        const findOptions = {
            offset: items_per_page * (pageno - 1),
            limit: items_per_page,
            //order: ['nombre'],
            //include: [{model: models.Attachment, as: "photo"}]
        };

        const users = await models.Usuario.findAll(findOptions);
        res.render('users/index', {
            users,
            //attHelper
        });
    } catch (error) {
        next(error);
    }
};

// GET /users/:userId
exports.show = (req, res, next) => {

    const {user} = req.load;

    res.render('users/show', {user});
};


// GET /users/new
exports.new = (req, res, next) => {

    const user = {
        username: "",
        password: ""
    };

    res.render('users/new', {user});
};


// POST /users
exports.create = async (req, res, next) => {

    const {username, password} = req.body;

    let user = models.Usuario.build({nombre: username, password});

    // Password must not be empty.
    if (!password) {
        req.flash('error', 'Password no debe de estar vacío.');
        return res.render('users/new', {user});
    }

    try {
        // Create the token field:
        //user.token = authentication.createToken();

        // Save into the data base
        user = await user.save({fields: ["nombre", "password", "salt"]});
        req.flash('success', 'Usuario creado correctamente.');
        res.redirect('/users/' + user.id);

    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            req.flash('error', `Usuario "${username}" ya existe.`);
            res.render('users/new', {user});
        } else if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Hay errores en los datos:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.render('users/new', {user});
        } else {
            req.flash('error', 'Error creando el nuevo usuario: ' + error.message);
            next(error);
        }
    } 
};

// Aux function to upload req.file to cloudinary, create an attachment with it, and
// associate it with the given user.
// This function is called from the create an update middlewares. DRY.
const createUserPhoto = async (req, user) => {

    // Save the attachment into Cloudinary
    const uploadResult = await attHelper.uploadResource(req);

    let attachment;
    try {
        // Create the new attachment into the data base.
        attachment = await models.Attachment.create({
            resource: uploadResult.resource,
            url: uploadResult.url,
            filename: req.file.originalname,
            mime: req.file.mimetype
        });
        await user.setPhoto(attachment);
        req.flash('success', 'Photo saved successfully.');
    } catch (error) { // Ignoring validation errors
        req.flash('error', 'Failed linking photo: ' + error.message);
        attHelper.deleteResource(uploadResult.resource);
        attachment && attachment.destroy();
    }
};


// GET /users/:userId/edit
exports.edit = (req, res, next) => {

    const {user} = req.load;

    res.render('users/edit', {user});
};


// PUT /users/:userId
exports.update = async (req, res, next) => {

    const {body} = req;
    const {user} = req.load;

    // user.nombre  = body.user.nombre; // edition not allowed

    let fields_to_update = [];

    // ¿Cambio el password?
    if (body.password) {
        console.log('Updating password');
        user.password = body.password;
        fields_to_update.push('salt');
        fields_to_update.push('password');
    }

    try {
        await user.save({fields: fields_to_update});
        req.flash('success', 'Usuario modificado con éxito.');
        res.redirect('/users/' + user.id);

    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'Hay errores en los datos:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.render('users/edit', {user});
        } else {
            req.flash('error', 'Error editando el usuario: ' + error.message);
            next(error)
        }
    }
};


// DELETE /users/:userId
exports.destroy = async (req, res, next) => {

    try {
        await req.load.user.destroy();

        req.flash('success', 'Usuario borrado correctamente.');
        res.redirect('/goback');
    } catch (error) {
        req.flash('error', 'Error al borrar el usuario: ' + error.message);
        next(error)
    }
};


//-----------------------------------------------------------


// PUT /users/:id/token
// Create a saves a new user access token.
exports.createToken = async (req, res, next) => {

    req.load.user.token = authentication.createToken();

    try {
        const user = await req.load.user.save({fields: ["token"]});
        req.flash('success', 'User Access Token created successfully.');
        res.redirect('/users/' + user.id);
    } catch (error) {
        next(error);
    }
};

//-----------------------------------------------------------
