var express = require('express');
var router = express.Router();

const monedasController = require('../controllers/monedas');
const coleccionController = require('../controllers/coleccion');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload para usar :paisId
router.param('paisId', monedasController.load);

// Autoload para usar :monedaId
router.param('monedaId', coleccionController.load);

/* Rutas que muestran las monedas por paises */
router.get('/monedas',                              monedasController.index);
router.get('/monedas/:paisId(\\d+)',                monedasController.show);
router.get('/monedas/:paisId(\\d+)/series',         monedasController.show_series);
router.get('/monedas/:paisId(\\d+)/conmemorativas', monedasController.show_conme);

/* Rutas que muestran la colección de las series */
router.get('/coleccion',                               coleccionController.index);
router.get('/coleccion/formulario',                    coleccionController.formulario);
router.get('/coleccion/show',                          coleccionController.show);
router.get('/coleccion/new',                           coleccionController.new);
router.post('/coleccion',                              coleccionController.create);
router.delete('/coleccion/:monedaId(\\d+)',            coleccionController.destroy);
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


module.exports = router;
