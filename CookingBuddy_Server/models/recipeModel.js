const mongoose = require('mongoose');

// Creates a new schema for the database
const recipeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
    // Rest of properties will go here in same format as above
})

// Exports this to use in other files
module.exports = mongoose.model('Recipe', recipeSchema)