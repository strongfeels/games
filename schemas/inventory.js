const mongoose = require('mongoose');

let inventorySchema = mongoose.Schema({
    game: {
        type: String
    },

    genre: {
        type: String
    },

    price: {
        type: Number
    },

    isAvailable: Boolean
})

module.exports = mongoose.model('Game', inventorySchema)