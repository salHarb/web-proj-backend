var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
const models = require('./models')
var indexRouter = require('./routes/index');
var eventsRouters = require('./routes/events');

const cors = require('cors')

mongoose.connect('mongodb://salHarb:salma1234@ac-pi2hqji-shard-00-00.yrxuuqu.mongodb.net:27017,ac-pi2hqji-shard-00-01.yrxuuqu.mongodb.net:27017,ac-pi2hqji-shard-00-02.yrxuuqu.mongodb.net:27017/?ssl=true&replicaSet=atlas-4wzwve-shard-0&authSource=admin&retryWrites=true&w=majority', {}).then(async connection => {
  console.log("Connected");

  // const user1 = new models.users({
  //   name: "Salma",
  //   email: "salma@gmail.com",
  //   password: "abcd1234",
  //   avatar: '1.png'
  // })

  // await user1.save()
  // const event1 = new models.events({
  //   date: new Date("2023-01-01"),
  //   name: 'First event',
  //   desc: "Description 1",
  //   user: user1
  // })
  // await event1.save()
})


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use('/', indexRouter);
app.use('/events', eventsRouters);

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
