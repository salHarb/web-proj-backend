var express = require('express');
const models = require('../models');
var router = express.Router();
const jwt = require('jsonwebtoken');



router.post('/', async function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const user = await models.users.findOne({ username: username, password: password });
    if (user) {
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        console.log(token);
        res.json({ token: token })
    }
    else {
        res.status(401)
        res.json({ error: "user not found" });
    }

});


module.exports = router