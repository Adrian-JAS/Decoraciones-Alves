var express = require('express');
var router = express.Router();

const clientesController = require('../controllers/clientesController');

/* GET clientes. */
router.get('/', clientesController.list); 
router.post('/add', clientesController.save);
router.get('/delete/:id', clientesController.delete);

router.get('/create', (req,res) => {
    res.render('clientes_create');
});

router.get('/update/:id', clientesController.edit_list);
router.post('/update/:id', clientesController.edit_update);

module.exports = router;