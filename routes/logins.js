var express = require('express');
const models = require('../models');
var router = express.Router();
const jwt = require('jsonwebtoken');



router.post('/', async function(req, res, next) {
    return res.json({token: jwt.sign({userId: 123}, "token", {expiresIn: '1h'})})
    const username = req.body.username;
    const password = req.body.password;
    const user = await models.users.findOne({username:username,password:password});
    if(user) {
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
            });
            res.json({token:token})
    }
    else {
        res.status(401)
        res.json({error:"user not found"});
    }
    
  });
  

module.exports = router