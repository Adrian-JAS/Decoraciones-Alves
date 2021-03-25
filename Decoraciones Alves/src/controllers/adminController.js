const controller = {};

controller.auth = function(req, res, next) {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
    req.getConnection((err, conn) => {
        if(nombre && contraseña){
            conn.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, row) =>{
                if(row.length == 0 || (contraseña != row[0].contraseña)){
                    res.render('admin',{
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Contraseña Incorrectas.",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'admin'
                    });
                }else{
                    req.session.loggedin = true;
                    req.session.nombre = row[0].nombre;
                    res.render('admin',{
                        alert: true,
                        alertTitle: "Conexión Exitosa",
                        alertMessage: "¡Inicio de sesión correcto!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        ruta: 'usuarios'
                    });
                }
            });
        }else{
            res.render('admin',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "¡Por favor, ingrese un Usuario y/o Contraseña!",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: false,
                ruta: 'admin'
            });
        }
    });
};

module.exports = controller;