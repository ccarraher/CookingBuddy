const express = require('express');
const mongoose = require('mongoose');
const recipeController = require('./controllers/recipeController');
const registerController = require('./controllers/registerController')
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
const router = express.Router()
const APP_PORT = 3000
const path = require('path')

// Connects to the database
mongoose.connect(mongoString)

// Instance of database
const db = mongoose.connection;

// If there is an error log it so we can see
db.on('error', (error) => {
    console.log(error)
})

// Reassurance that we connected to DB
db.once('connected', () => {
    console.log('Database connected');
})

// Instance of the express framework (don't worry about this too much)
const app = express();

// Routes to display the different web pages
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views'+'/home.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views'+'/register.html'))
})

router.get('/recipe', (req, res) => {
    res.sendFile(path.join(__dirname + '/views'+'/recipe.html'))
})


app.use(express.json());
// Tell the app to use the registerController for any URLs that have /register, for example localhost:3000/register + the path from registerController (I'll explain in there)
app.use('/', router)
app.use('/register-api', registerController)
app.use('/recipe-api', recipeController)

// Allows our server to run on port 3000, then logs it
app.listen(APP_PORT, () => {
    console.log(`Server started on ${APP_PORT}`)
})
