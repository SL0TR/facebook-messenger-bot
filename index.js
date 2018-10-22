"use strict";

// Imports dependencies and set up http server
const express = require("express"),
  messengerWebbhookController = require("./controllers/messengerWebhook"),
  PORT = process.env.PORT || 1337,
  app = express();

// Fire controllers
messengerWebbhookController(app);

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () =>
  console.log(`Server is listening on port ${PORT}`)
);
