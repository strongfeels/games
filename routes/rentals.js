const express = require('express');
const router = express.Router();
const Rentals = require('../models/rentals');

router.post(
    '/makeorder',
    (req, res, next) => {
    const order = new Rentals({
        user: req.body.user,
        gameId: req.body.id,
        gameName: req.body.name,
        genre: req.body.genre,
        daysRented: req.body.daysRented,
    })
    order.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.get(
    '/userrentals',
    (req, res, next) => {
    Rentals.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

module.exports = router;