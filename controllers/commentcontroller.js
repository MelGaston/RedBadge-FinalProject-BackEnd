var router = require('express').Router();
var sequelize = require('../db');
var Comments = sequelize.import("../models/commentmodel")
validateSession = require('../middleware/validate-session');

router.get('/comments', function (req, res) {

    Comments.findAll({
        })
        .then(
            function findAllSuccess(data) {
                res.status(200).json({
                    comment: data,
                    message: "Data fetched."
                })
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/mine', (req, res) => {
    Comments.create({
            user_id: req.user.id,         //naksdbja
            username: req.body.commentdata.username,
            comment: req.body.commentdata.comment,
            typeOf: req.body.commentdata.typeOf,
            votes: req.body.commentdata.votes
        });
});

router.post('/create', validateSession, function(req, res) {
    console.log(req.body)

    Comments.create({
            user_id: req.user.id,
            username: req.body.commentdata.username,
            comment: req.body.commentdata.comment,
            typeOf: req.body.commentdata.typeOf,
            votes: req.body.commentdata.votes
        })
})

router.put('/update/:id', (req, res) => {
    Comments.update({
            user_id: req.user.id,
            username: req.body.commentdata.username,
            comment: req.body.commentdata.comment,
            typeOf: req.body.commentdata.typeOf,
            votes: req.body.commentdata.votes
    },
        {
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })
        .then(
            function updateSuccess(comment) {
                res.status(200).json({
                    comment: comment,
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

router.delete('/remove/:id', (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(comment) {
            res.status(200).json({
                comment: comment,
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