"use strict";

// Imports dependencies and set up http server
const express = require('express'),

messengerWebbhookController = require('./controllers/messengerWebhook'),

app = express();


// Fire controllers
messengerWebbhookController(app);

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));


