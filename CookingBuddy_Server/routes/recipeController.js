const express = require('express');
const Recipe = require('../models/recipeModel');

const recipeController = express.Router()

module.exports = recipeController;

recipeController.post('/post', async (req, res) => {
    const data = new Recipe({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch(error) {
        res.status(400).json({message: error.message})
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