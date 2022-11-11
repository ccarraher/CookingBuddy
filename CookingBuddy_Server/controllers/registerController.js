const express = require('express');
const User = require('../models/userModel');

const registerController = express.Router()

module.exports = registerController;

registerController.post('/post', async (req, res) => {
    //validate req user items
    //if valid, create a new user object
    let msg = ""

    let validEmail = Boolean(emailValidator(req.body.email)); //I'm not sure if these are the correct attribute names
    let validPhoneNumber = Boolean(phoneNumberValidator(req.body.phoneNumber));
    let validFirstName = Boolean(firstNameValidator(req.body.firstName));
    let validLastName = Boolean(lastNameValidator(req.body.lastName));
    let validPassword = Boolean(passwordValidator(req.body.password, req.body.passwordConfirmation))

    if (validEmail && validPhoneNumber && validFirstName && validLastName && validPassword) {
        //create a new user object
        const data = new User({
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        })
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        } catch(error) {
            res.status(400).json({message: error.message})
        }
        //store in DB
    }
    else {
        msg = "Invalid input, registration failed"
        res.status(400).json({message: msg})
    }

})

registerController.get('/getAll', async (req, res) => {
    try {
        const data = await User.find()
        res.json(data);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})



registerController.get('/getOne/:id', async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

registerController.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

registerController.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//validator functions, simplified
//
//
//

function emailValidator(email){
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
        return true;
    } 
    else {
        return false;
    }
}

function phoneNumberValidator(phoneNumber)
{
    //ignore format, validate numbers
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phoneNumber.replace(/\D/g, "");
    return phoneRe.test(digits);
}

function firstNameValidator(firstName)
{
    if (firstName.length > 0 && firstName.length < 20) {
        return true;
    }
    else {
        return false;
    }
}

function lastNameValidator(lastName)
{
    if (lastName.length > 0 && lastName.length < 25) {
        return true;
    }
    else {
        return false;
    }
}

function passwordValidator(password, passwordConfirmation)
{
    return /[A-Z]/       .test(password) && //one uppercase
           /[a-z]/       .test(password) && // one lowercase
           /[0-9]/       .test(password) && // one digit
           /[^A-Za-z0-9]/.test(password) && // one special symbol
           password.length > 4 && 
           password == passwordConfirmation
}



