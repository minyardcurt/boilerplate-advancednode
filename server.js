'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

// For FCC testing
fccTesting(app);

// Serve static files and parse JSON/form data
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 1: Set the view engine to Pug
app.set('view engine', 'pug');
console.log('[INIT] View engine set to Pug');

// Step 2: Set the views directory
app.set('views', './views/pug');
console.log('[INIT] Views directory set to ./views/pug');

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

// Step 3: Handle HEAD requests (required by FCC tests)
app.head('/', (req, res) => {
  console.log('[HEAD REQUEST] /');
  res.status(200).end();
});

// Step 4: Render the Pug template on the home route
app.get('/', (req, res) => {
  console.log('[ROUTE] Home route hit - rendering Pug template...');
  try {
    res.render('index', {
      title: 'Hello from Pug!',
      message: 'Pug template successfully rendered!',
      showLogin: false,
      showRegistration: false,
      showSocialAuth: false
    });
    console.log('[RENDER] index.pug rendered successfully!');
  } catch (err) {
    console.error('[ERROR] Failed to render index.pug:', err.message);
    res.status(500).send('Pug render failed');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Listening on port ${PORT}`);
});
