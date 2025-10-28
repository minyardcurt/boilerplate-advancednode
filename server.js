// server.js
'use strict';

const express = require('express');
const path = require('path');
const app = express();

// -----------------------------
// FCC testing middleware
// -----------------------------
if (process.env.NODE_ENV === 'test' || process.env.FCC_TEST) {
  console.log('FCC testing enabled');
  const fccTesting = require('./fcctesting.js');
  fccTesting(app);
}

// -----------------------------
// CORS for FCC testing
// -----------------------------
const allowedOrigins = [
  /^https?:\/\/([\w-]+\.)*freecodecamp.org/,
  /^https?:\/\/([\w-]+\.)*freecodecamp.dev/,
  /^https:\/\/([\w-]+\.)*gitpod.io/,
  /^https:\/\/([\w-]+\.)*github.dev/,
  /^http:\/\/localhost:\d+/,
];

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (allowedOrigins.some((regex) => regex.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// -----------------------------
// Logging middleware
// -----------------------------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} => ${res.statusCode}`
    );
  });
  next();
});

// -----------------------------
// Pug setup
// -----------------------------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pug'));

// -----------------------------
// Serve static files
// -----------------------------
app.use('/public', express.static(path.join(__dirname, 'public')));

// -----------------------------
// Required FCC API endpoints
// -----------------------------
app.get('/_api/package.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'package.json'));
});

app.get('/_api/app', (req, res) => {
  res.json({ status: 'OK', app: 'Express app is running' });
});

// -----------------------------
// Root route
// -----------------------------
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Hello Pug!' });
});

// -----------------------------
// Export app for FCC testing
// -----------------------------
module.exports = app;

// -----------------------------
// Start server only if run directly
// -----------------------------
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
