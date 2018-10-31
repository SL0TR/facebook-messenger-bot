const express = require('express'),
  app = express(),
  err = require('./middleware/err'),
  api = require('./api/api');


// Setup the app middlware
require('./middleware/appMiddleware')(app);

// Fire controller
// messengerWebbhookController(app);

// serve static files
app.use(express.static('public'));

// setup the api
app.use(api);

// set up global error handling
app.use(err());


// export the app for testing
module.exports = app;
