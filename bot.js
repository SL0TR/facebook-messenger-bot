"use strict";

// Imports dependencies and set up http server
const express = require("express"),
  messengerWebbhookController = require("./controllers/messengerWebhook"),
  PORT = process.env.PORT || 1337,
  app = express();

// Fire controllers
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

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () =>
  console.log(`Server is listening on port ${PORT}`)
);
