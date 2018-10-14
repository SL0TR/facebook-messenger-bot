"use strict";

// Imports dependencies and set up http server
const express = require("express"),
  messengerWebbhookController = require("./controllers/messengerWebhook"),
  PORT = process.env.PORT || 8080,
  app = express();

// Fire controllers
messengerWebbhookController(app);

// Sets server port and logs message on success
app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is listening on port ${PORT}`)
);
