'use strict';
require('dotenv').config();
const express = require('express');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

// Template engine setup — must be BEFORE fccTesting
app.set('view engine', 'pug');
app.set('views', './views/pug');

// FCC testing
fccTesting(app); // Do not move this above app.set()

// Serve static files if needed
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route — must render 'index' with res.render()
app.route('/').get((req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port ' + PORT));

