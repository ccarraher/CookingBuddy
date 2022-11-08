const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
APP_PORT = 3000

mongoose.connect(mongoString)
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Database connected');
})

const app = express();

app.use(express.json());
app.use('/api', routes)

app.listen(APP_PORT, () => {
    console.log(`Server started on ${APP_PORT}`)
})
