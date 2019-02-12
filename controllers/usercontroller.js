var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/usermodel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send("string");
})

router.post('/signup', function (req, res) {
    console.log("something");

    var username = req.body.user.username;
    var firstName = req.body.user.firstName;
    var lastName = req.body.user.lastName;
    var pass = req.body.user.password;
    var email = req.body.user.email;
    var adminStatus = req.body.user.adminStatus;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10),
        firstName: firstName,
        lastName: lastName,
        email: email,
        adminStatus: adminStatus

    }).then(

        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.status(200).json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

router.post('/signin', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                        res.json({
                            user: user,
                            message: 'successfully authenticated',
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "You hath failed" });
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function (err) {
            res.status(501).send({ error: "You hath failed" });
        }
    );
});

module.exports = router;