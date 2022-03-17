var express = require('express');
var router = express.Router();

const monedasController = require('../controllers/monedas');
const coleccionController = require('../controllers/coleccion');
const userController = require('../controllers/user');
const sessionController = require('../controllers/session');

// Routes for the resource /login

// autologout
router.all('*',sessionController.checkLoginExpires);

// login form
router.get('/login', sessionController.new);

// create login session
router.post('/login',
    sessionController.create,
    sessionController.createLoginExpires);

// logout - close login session
router.delete('/login', sessionController.destroy);

// History: Restoration routes.

// Redirection to the saved restoration route.
function redirectBack(req, res, next) {
  const url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
}

router.get('/goback', redirectBack);

// Save the route that will be the current restoration route.
function saveBack(req, res, next) {
  req.session.backURL = req.url;
  next();
}

// Restoration routes are GET routes that do not end in:
//   /new, /edit, /play, /check, /login or /:id.
router.get(
  [
      '/',
      '/monedas',
      //'/coleccion/formulario',
      '/coleccion',
      '/users',
      //'/monedas/:paisId(\\d+)'
  ],
  saveBack);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload para usar :paisId
router.param('paisId', monedasController.load);

// Autoload para usar :userId
router.param('userId', userController.load);

// Autoload para usar :monedaId
router.param('monedaId', coleccionController.load);

/* Rutas que muestran las monedas por paises */
router.get('/monedas',                              monedasController.index);
router.get('/monedas/:paisId(\\d+)',                monedasController.show);
router.get('/monedas/:paisId(\\d+)/series',         monedasController.show_series);
router.get('/monedas/:paisId(\\d+)/conmemorativas', monedasController.show_conme);

/* Rutas que muestran la colección de las series */
router.get('/coleccion',                    sessionController.loginRequired, coleccionController.index);
router.get('/coleccion/formulario',         sessionController.loginRequired, coleccionController.formulario);
router.get('/coleccion/show',               sessionController.loginRequired, coleccionController.show);
router.get('/coleccion/new',                sessionController.loginRequired, coleccionController.new);
router.post('/coleccion',                   sessionController.loginRequired, coleccionController.create);
router.delete('/coleccion/:monedaId(\\d+)', sessionController.loginRequired, coleccionController.adminOrColeccionistaRequired, coleccionController.destroy);
/*
router.get('/coleccion/series/:monedaId(\\d+)/edit',   coleccionController.edit_series);

router.put('/coleccion/series/:monedaId(\\d+)',        coleccionController.update_series);
*/

/* Rutas que muestran la colección de las conmemorativas */
//router.get('coleccion/conmemorativas/formulario',              coleccionController.formulario_conme);

/*
router.get('/coleccion/conmemorativas/show)',                  coleccionController.show_conme);
router.get('/coleccion/conmemorativas/new',                    coleccionController.new_conme);
router.get('/coleccion/conmemorativas/:monedaId(\\d+)/edit',   coleccionController.edit_conme);
router.post('/coleccion/conmemorativas',                       coleccionController.create_conme);
router.put('/coleccion/conmemorativas/:monedaId(\\d+)',        coleccionController.update_conme);
router.delete('/coleccion/conmemorativas/:monedaId(\\d+)',     coleccionController.destroy_conme);
*/

//Rutas para el recurso users

router.get('/users',
    sessionController.loginRequired,
    userController.index);
router.get('/users/:userId(\\d+)',
    sessionController.loginRequired,
    userController.show);

//if (!!process.env.QUIZ_OPEN_REGISTER) {
router.get('/users/new',
    sessionController.loginRequired,
    sessionController.adminRequired,
    userController.new);
router.post('/users',
    //upload.single('photo'),
    sessionController.loginRequired,
    sessionController.adminRequired,
    userController.create);
//} else {
    //router.get('/users/new',
        //sessionController.loginRequired,
        //sessionController.adminRequired,
        //userController.new);
    //router.post('/users',
        //sessionController.loginRequired,
        //sessionController.adminRequired,
        //upload.single('photo'),
      //userController.create);
//}

router.get('/users/:userId(\\d+)/edit',
    sessionController.loginRequired,
    //userController.isLocalRequired,
    sessionController.adminOrMyselfRequired,
    userController.edit);
router.put('/users/:userId(\\d+)',
    sessionController.loginRequired,
    //userController.isLocalRequired,
    sessionController.adminOrMyselfRequired,
    //upload.single('photo'),
    userController.update);
router.delete('/users/:userId(\\d+)',
    sessionController.loginRequired,
    sessionController.adminRequired,
    userController.destroy);

/*
router.put('/users/:userId(\\d+)/token',
    sessionController.loginRequired,
    sessionController.adminOrMyselfRequired,
    userController.createToken);   // generar un nuevo token


router.get('/users/:userId(\\d+)/quizzes',
    sessionController.loginRequired,
    quizController.index);
*/

module.exports = router;
