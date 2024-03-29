/* Api for simple ecommerce */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jsonWebT = require('./config/jwt');
const db = require('./config/mongoDB');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./documentation/doc');
const { logGenerator } = require('./logs/logs');

// Router import
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
const corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

app.jsonwebtocken = jsonWebT;

// Ignore favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// Doc
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logs
app.use(logGenerator);

// Router first step endpoint
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;