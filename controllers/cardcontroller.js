var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
let Card = sequelize.import('../models/cardmodel');
validateSession = require('../middleware/validate-session');


router.get('/card', function (req, res) {

    Card
        .findAll({
        })
        .then(
            function findAllSuccess(data) {
                res.status(200).json({
                    carddata: data,
                    message: "Data fetched."
                })
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/mine', validateSession, (req, res) => {
    Card.findAll({ where: { user_id: req.user.id } })
    .then(
        function findSuccess(card) {
            res.status(200).json({
                card: card
            })
        },

        function findFail(err) {
            res.status(500).json({
                message: "data not found."
            })
        }
    )
})

router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    
    Card
        .create({
            user_id: req.user.id,
            bevName: req.body.carddata.bevName,
            temp: req.body.carddata.temp,
            prepTime: req.body.carddata.prepTime,
            servingSize: req.body.carddata.servingSize,
            ingredients: req.body.carddata.ingredients,
            flavorProfile: req.body.carddata.flavorProfile,
            notes: req.body.carddata.notes,
            type: req.body.carddata.type
        })
        .then(
            function createSuccess(carddata) {
                res.json({
                    carddata: carddata
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', validateSession, (req, res) => {
    Card
        .update({
            bevName: req.body.carddata.bevName,
            temp: req.body.carddata.temp,
            prepTime: req.body.carddata.prepTime,
            servingSize: req.body.carddata.servingSize,
            ingredients: req.body.carddata.ingredients,
            flavorProfile: req.body.carddata.flavorProfile,
            notes: req.body.carddata.notes,
            type: req.body.carddata.type
    },
        {
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })
        .then(
            function updateSuccess(card) {
                res.status(200).json({
                    card: card,
                    message: "Successfully updated."
                })
            },

            function updateFail(err) {
                res.status(500).json({
                    message: err.message
                })
            }
        )
})

router.delete('/remove/:id', validateSession, (req, res) => {
    Card
        .destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(card) {
            res.status(200).json({
                card: card,
                message: "Successfully delete."
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})

module.exports = router;