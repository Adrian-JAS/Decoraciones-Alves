const controller = {};

controller.list = function(req, res, next) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ventas', (err, venta) => {
            if(err) {
                res.json(err);
            }
            //console.log(usuario); 
            if(req.session.loggedin) {
                res.render('ventas', {
                    data: venta,
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
        conn.query('INSERT INTO ventas set ?', [data], (err, row) => {
            res.redirect('/ventas');
        });
    });
};

controller.edit_list = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ventas WHERE id = ?', [id], (err, row) => {
            res.render('ventas_edit', {
                data: row[0]
            });
        });
    });
};

controller.edit_update = function(req, res, next) {
    const { id } = req.params;
    const newInfo = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE ventas set ? WHERE id = ?', [newInfo, id], (err, row) => {
            res.redirect('/ventas');
        });
    });
};

controller.delete = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM ventas WHERE id = ?', [id], (err, row) => {
            res.redirect('/ventas');
        });
    });
};

module.exports = controller;