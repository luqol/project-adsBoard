const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

//init server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

//connect to mongo database

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true,  });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database')
});

db.on('error', err => console.log('Error: ' + err));

//connect to websocket

//imports routes
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

//server static files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

//midleware
app.use(helmet());

const corsOptions = {
    origin: 'http://localhost:3000', // lub adres Twojej aplikacji frontendowej
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init session
app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.urlDB,
        ttl: 3600
    })
}));

// add routes
app.use('/api', adsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes );


//client app
/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
*/

//home
app.get('/', (req, res) => {
    res.send('<h1>my server</h1>');
});

//404
app.use((req, res) => {
    res.status(404);
    res.json.apply({messange: 'Not found...'})
});

