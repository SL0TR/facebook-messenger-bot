const express = require('express'),
  app = express(),
  err = require('./middleware/err'),
  messengerWebbhookController = require("../controllers/messengerWebhook");


// setup the app middlware
require('./middleware/appMiddleware')(app);

// Fire controller
messengerWebbhookController(app);

// serve static files
app.use(express.static('public'));

// Send static site
app.get('/', (req, res) => {
  console.log('Request was made from: ' + req.url);
  res.sendFile(__dirname + '/public/index.html', err => {
    if (err) {
      res.status(500).send.err
    }
  })
})

// set up global error handling
app.use(err());


// export the app for testing
module.exports = app;
