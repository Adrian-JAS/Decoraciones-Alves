const controller = {};

controller.list = function(req, res, next) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuario) => { // usuario es un nombre generico para hacer referencia a los datos, se pudo poner o row(filas) o usuarios
            if(err) {
                res.json(err);
            }
            //console.log(usuario); Verifica si los datos estan entrando.
            if(req.session.loggedin) {
                res.render('usuarios', {
                    data: usuario,
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
        conn.query('INSERT INTO usuarios set ?', [data], (err, row) => {
            res.redirect('/usuarios');
        });
    });
};

controller.edit_list = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
            res.render('usuarios_edit', {
                data: row[0]
            });
        });
    });
};

controller.edit_update = function(req, res, next) {
    const { id } = req.params;
    const newInfo = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE usuarios set ? WHERE id = ?', [newInfo, id], (err, row) => {
            res.redirect('/usuarios');
        });
    });
};

controller.delete = function(req, res, next) {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuarios WHERE id = ?', [id], (err, row) => {
            res.redirect('/usuarios');
        });
    });
};

module.exports = controller;