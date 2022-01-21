var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Página que muestra las monedas por paises */
router.get('/monedas', (req, res, next) => {
  res.render('monedas');
});

module.exports = router;
