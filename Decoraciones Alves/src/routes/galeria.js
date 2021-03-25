var express = require('express');
var router = express.Router();

/* GET galeria. */
router.get('/', function(req, res, next) {
  res.render('galeria', { title: 'Express' });
});

module.exports = router;