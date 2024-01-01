var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
const models = require('./models')
var indexRouter = require('./routes/index');
var eventsRouters = require('./routes/events');
var tasksRouter = require('./routes/tasks');
var registrationRouter = require('./routes/registration');
var loginsRouter = require('./routes/logins');
const jwt = require('jsonwebtoken')
const cors = require('cors')

mongoose.connect('mongodb://salHarb:salma1234@ac-pi2hqji-shard-00-00.yrxuuqu.mongodb.net:27017,ac-pi2hqji-shard-00-01.yrxuuqu.mongodb.net:27017,ac-pi2hqji-shard-00-02.yrxuuqu.mongodb.net:27017/?ssl=true&replicaSet=atlas-4wzwve-shard-0&authSource=admin&retryWrites=true&w=majority', {}).then(async connection => {
  console.log("Connected");
})


var app = express();

const authenticateUser = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = jwt.verify(req.headers.authorization, 'your-secret-key')
    Object.assign(req, { user: token })
    next();
  }
  catch (e) {

    res.status(401)
    return res.json({ error: "UnAuthorized" })
  }
}


app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use('/', indexRouter);
app.use('/events', authenticateUser, eventsRouters);
app.use('/tasks', authenticateUser, tasksRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
