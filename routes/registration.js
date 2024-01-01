var express = require('express');
const models = require('../models');
var router = express.Router();



router.post('/', async function(req, res, next) {
    console.log(req.body)
    const register = new models.users({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      date: new Date(req.body.date),
      completed: false
    })
    await register.save();
    res.json();
  });

module.exports = router