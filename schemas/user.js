const mongoose = require('mongoose');

let SchemaUser = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = SchemaUser = mongoose.model('user',SchemaUser);