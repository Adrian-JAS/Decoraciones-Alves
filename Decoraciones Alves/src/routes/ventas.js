var express = require('express');
var router = express.Router();

const ventasController = require('../controllers/ventasController');

/* GET ventas. */
router.get('/', ventasController.list); 
router.post('/add', ventasController.save);
router.get('/delete/:id', ventasController.delete);

router.get('/create', (req,res) => {
    res.render('ventas_create');
});

router.get('/update/:id', ventasController.edit_list);
router.post('/update/:id', ventasController.edit_update);

module.exports = router;
