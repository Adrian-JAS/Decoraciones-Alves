const controller = {};

controller.list = function(req, res, next) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM proveedores', (err, proveedor) => { 
            if(err) {
                res.json(err);
            }
            //console.log(usuario); 
            if(req.session.loggedin) {
                res.render('proveedores', {
                    data: proveedor,
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
        conn.query('INSERT INTO proveedores set ?', [data], (err, row) => {
            res.redirect('/proveedores');
        });
    });
};

controller.edit_list = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM proveedores WHERE id = ?', [id], (err, row) => {
            res.render('proveedores_edit', {
                data: row[0]
            });
        });
    });
};

controller.edit_update = function(req, res, next) {
    const { id } = req.params;
    const newInfo = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE proveedores set ? WHERE id = ?', [newInfo, id], (err, row) => {
            res.redirect('/proveedores');
        });
    });
};

controller.delete = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM proveedores WHERE id = ?', [id], (err, row) => {
            res.redirect('/proveedores');
        });
    });
};

module.exports = controller;