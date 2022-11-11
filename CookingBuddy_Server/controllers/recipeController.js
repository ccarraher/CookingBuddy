const express = require('express');
const Recipe = require('../models/recipeModel');

const recipeController = express.Router()

module.exports = recipeController;

recipeController.post('/post', async (req, res) => {
    //make message
    let msg = "";

    //validate title, ingredients, steps, images(optional), price(optional)
    //if it looks good create the message :)
    if (validateTitle(req.body.title) && validateIngredients(req.body.ingredients) && validateSteps(req.body.steps)
    && validatePrice(req.body.price))
    {
        msg = "Upload Successful"
        //create recipe object
        const data = new Recipe({
            title: req.body.title,
        })
        
        //add recipe object to DB
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        } catch(error) {
            res.status(400).json({message: error.message})
        }
        //dipslay msg to user
    }
    else {
        msg = "One or more of the entries is incorrect, please try again";
        res.status(400).json({message: msg})
        //display msg to user
    }
    

})

recipeController.get('/getAll', async (req, res) => {
    try {
        const data = await Recipe.find()
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})



recipeController.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Recipe.findById(req.params.id);
        res.json(data)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

recipeController.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Recipe.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

recipeController.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Recipe.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

function validateTitle(title){
    //not too big, not too small, and no brackets (possible code injection)
    if (title.length < 30 && title.length > 0 && !title.includes("<")) { 
        return true
    }
    else {
        return false
    }
}

function validateIngredients(ingredients){
    //not too big, not too small, and no brackets (possible code injection)
    if (ingredients.length < 1000 && ingredients.length > 0 && !ingredients.includes("<")) { 
        return true
    }
    else {
        return false
    }
}

function validateSteps(steps){
    //not too big, not too small, and no brackets (possible code injection)
    if (steps.length < 5000 && !steps.includes("<")) { 
        return true
    }
    else {
        return false
    }
}

function validateImages(images){
    // can be empty
    // can't be > 1000
    // can only be .jpeg, .jpg, .png
    

    if (images.length > 0) { 
        if (images.length < 1000 && (images.includes(".png") || images.includes(".jpeg") || images.includes(".jpg"))) {
            return true
        }
        else {
            return false;
        }
    }
    else { //empty
        return true;
    }
}


function validatePrice(price){
    // can be empty
    // represents a nonnegative number
    if (price.length > 0) { 
        if (price > 0.0) {
            return true
        }
        else {
            return false;
        }
    }
    else { //empty
        return true;
    }
}
