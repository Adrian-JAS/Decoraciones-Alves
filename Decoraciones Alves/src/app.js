var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var session = require('express-session');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactoRouter = require('./routes/contacto');
var galeriaRouter = require('./routes/galeria');
var adminRouter = require('./routes/admin');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');
var clientesRouter = require('./routes/clientes');
var ventasRouter = require('./routes/ventas');
var presupuestosRouter = require('./routes/presupuestos');
var proveedoresRouter = require('./routes/proveedores');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'decoracionesalves'
}, 'single'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contacto', contactoRouter);
app.use('/galeria', galeriaRouter);
app.use('/admin', adminRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
app.use('/ventas', ventasRouter);
app.use('/presupuestos', presupuestosRouter);
app.use('/proveedores', proveedoresRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
