const mongoose = require('mongoose');

let rentalSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    gameId: {
        type: mongoose.Types.ObjectId, ref: 'Game'
    },
    gameName: {
        type: String
    },
    genre: {
        type: String
    },
    daysRented: {
        type: Number
    },
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Rental', rentalSchema)