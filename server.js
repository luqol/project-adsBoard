const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

//init server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

//connect to websocket

//imports routes

//server static files

//midleware
app.use(helmet());

app.use(cors());

//endpoints

//home
app.get('/', (req, res) => {
    res.send('<h1>my server</h1>');
});

//404
app.use((req, res) => {
    res.status(404);
    res.json.apply({messange: 'Not found...'})
});

//connect to mongo database

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database')
});

db.on('error', err => console.log('Error: ' + err));