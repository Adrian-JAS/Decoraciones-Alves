var express = require('express');
var router = express.Router();

const usuariosController = require('../controllers/usuariosController');

/* GET usuarios. */
router.get('/', usuariosController.list); 
router.post('/add', usuariosController.save);
router.get('/delete/:id', usuariosController.delete);

router.get('/create', (req,res) => {
    res.render('usuarios_create');
});

router.get('/update/:id', usuariosController.edit_list);
router.post('/update/:id', usuariosController.edit_update);

module.exports = router;
