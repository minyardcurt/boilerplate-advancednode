'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

fccTesting(app); // For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Step 1: Set the view engine to pug
app.set('view engine', 'pug');

//  Step 2: Set the views directory
app.set('views', './views/pug');

//  Step 3: Render the pug template on home route
app.get((req, res) => {
  res.render('index', {
    title: 'Hello from Pug!',
    message: 'Pug template successfully rendered!',
    showLogin: false,
    showRegistration: false,
    showSocialAuth: false
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
