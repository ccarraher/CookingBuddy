const mongoose = require('mongoose');

// Creates a new schema for the database
const recipeSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String
    }

    ,ingredients: {
        required: true,
        type: String
    }

    ,steps: {
        required: true,
        type: String
    }

    ,images: {
        required: false,
        type: String
    }

    ,price: {
        required: true,
        type: Number
    }
})

// Exports this to use in other files
module.exports = mongoose.model('Recipe', recipeSchema)