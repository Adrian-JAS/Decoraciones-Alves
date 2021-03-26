var express = require('express');
var router = express.Router();

const presupuestosController = require('../controllers/presupuestosController');

/* GET presupuestos. */
router.get('/', presupuestosController.list); 
router.post('/add', presupuestosController.save);
router.get('/delete/:id', presupuestosController.delete);

router.get('/create', (req,res) => {
    res.render('presupuestos_create');
});

router.get('/update/:id', presupuestosController.edit_list);
router.post('/update/:id', presupuestosController.edit_update);

module.exports = router;
