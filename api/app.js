var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');

var app = express();
app.use(cors());
require('dotenv').config();

const DB_URL = process.env.DB_URL_DOCKER; // docer mongo service
// const DB_URL = process.env.DB_URL; // local mongodb server

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectInterval: 500,
    reconnectTries: Number.MAX_VALUE,
  })
  .catch(error => logger.error(`mongo error: ${error}`));
mongoose.set('useFindAndModify', false); // useFindAndModify is deprecated

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todo', todoRouter);

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
