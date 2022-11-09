const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)