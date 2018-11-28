"use strict";

const handler = require("./webhookHandlers"),
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Creates the post request endpoint for our webhook
exports.post = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      // console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      // console.log('Sender PSID: ' + sender_psid);
      let userInfo;
      (async () => {
        userInfo = await handler.getUserInfo(sender_psid);
        // console.dir(userInfo, null, true)

        if (webhook_event.message) {

          handler.handleMessage(sender_psid, webhook_event.message, userInfo);

          // }
        } else if (webhook_event.postback) {
          // Check if the event is a message or postback and
          // pass the event to the appropriate handler function

          handler.handlePostback(sender_psid, webhook_event.postback);
        }
      })();
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Recieve GET request in out api gateway
exports.get = (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === PAGE_ACCESS_TOKEN) {
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
