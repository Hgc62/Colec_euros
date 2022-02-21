var express = require('express');
var router = express.Router();

const monedasController = require('../controllers/monedas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload para usar :paisId
router.param('paisId', monedasController.load);

/* Rutas que muestran las monedas por paises */
router.get('/monedas',                              monedasController.index);
router.get('/monedas/:paisId(\\d+)',                monedasController.show);
router.get('/monedas/:paisId(\\d+)/series',         monedasController.show_series);
router.get('/monedas/:paisId(\\d+)/conmemorativas', monedasController.show_conme);

module.exports = router;
