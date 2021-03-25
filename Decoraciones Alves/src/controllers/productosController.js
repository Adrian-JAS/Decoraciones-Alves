const controller = {};

controller.list = function(req, res, next) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, producto) => { // usuario es un nombre generico para hacer referencia a los datos, se pudo poner o row(filas) o usuarios
            if(err) {
                res.json(err);
            }
            //console.log(usuario); Verifica si los datos estan entrando.
            if(req.session.loggedin) {
                res.render('productos', {
                    data: producto,
                    login: true,
                    nombre: req.session.nombre
                });
            }else{
                return res.redirect('/admin');
            }
        });
    });
  };

controller.save = function(req, res, next) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO productos set ?', [data], (err, row) => {
            res.redirect('/productos');
        });
    });
};

controller.edit_list = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
            res.render('productos_edit', {
                data: row[0]
            });
        });
    });
};

controller.edit_update = function(req, res, next) {
    const { id } = req.params;
    const newInfo = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE productos set ? WHERE id = ?', [newInfo, id], (err, row) => {
            res.redirect('/productos');
        });
    });
};

controller.delete = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM productos WHERE id = ?', [id], (err, row) => {
            res.redirect('/productos');
        });
    });
};

module.exports = controller;