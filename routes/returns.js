const Joi = require("joi");
const validate = require("../middleware/validate");
const { Rental } = require("../models/rental");
const { Game } = require("../models/game");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.gameId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("This game has already been returned.");

  rental.return();
  await rental.save();

  await Game.update(
    { _id: rental.game._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    gameId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;