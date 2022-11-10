const mongoose = require('mongoose');

// Creates a new schema for the database
const recipeSchema = new mongoose.Schema({

    recipeName: {
        required: true,
        type: String
    }

    authorName: {
        required: true,
        type: String
    }

    ingredients: {
        required: true,
        type: String
    }

    steps: {
        required: true,
        type: String
    }
})

// Exports this to use in other files
module.exports = mongoose.model('Recipe', recipeSchema)