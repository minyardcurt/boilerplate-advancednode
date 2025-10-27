// server.js
'use strict';

const express = require('express');
const app = express();
const path = require('path');

// Set Pug as the view engine
app.set('view engine', 'pug');

// Set the directory where Pug templates are located
app.set('views', path.join(__dirname, 'views/pug'));

// Serve static files (optional but often required in FCC projects)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Root route — render index.pug with a message variable
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page', message: 'Hello Pug!' });
});

// Export app for testing (important for FCC test suite)
module.exports = app;

// Start server (only if run directly, not during testing)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
