const controller = {};

controller.list = function(req, res, next) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, cliente) => { 
            if(err) {
                res.json(err);
            }
            //console.log(usuario); 
            if(req.session.loggedin) {
                res.render('clientes', {
                    data: cliente,
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
        conn.query('INSERT INTO clientes set ?', [data], (err, row) => {
            res.redirect('/clientes');
        });
    });
};

controller.edit_list = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
            res.render('clientes_edit', {
                data: row[0]
            });
        });
    });
};

controller.edit_update = function(req, res, next) {
    const { id } = req.params;
    const newInfo = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE clientes set ? WHERE id = ?', [newInfo, id], (err, row) => {
            res.redirect('/clientes');
        });
    });
};

controller.delete = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM clientes WHERE id = ?', [id], (err, row) => {
            res.redirect('/clientes');
        });
    });
};

module.exports = controller;