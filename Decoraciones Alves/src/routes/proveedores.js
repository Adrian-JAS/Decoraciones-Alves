var express = require('express');
var router = express.Router();

const proveedoresController = require('../controllers/proveedoresController');

/* GET proveedores. */
router.get('/', proveedoresController.list); //Muestra los registros
router.post('/add', proveedoresController.save);
router.get('/delete/:id', proveedoresController.delete);

router.get('/create', (req,res) => {
    res.render('proveedores_create');
});

router.get('/update/:id', proveedoresController.edit_list);
router.post('/update/:id', proveedoresController.edit_update);

module.exports = router;
