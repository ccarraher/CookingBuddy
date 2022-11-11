const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email: {
        required: true,
        type: String
    }

    ,phoneNumber: {
        required: true,
        type: String
    }

    ,firstName: {
        required: true,
        type: String
    }

    ,lastName: {
        required: true,
        type: String
    }

    ,password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)