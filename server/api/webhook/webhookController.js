"use strict";

const axios = require('axios'),
  helper = require('./webhookHelpers');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


// Creates the endpoint for our webhook
exports.post = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Adds support for GET requests to our webhook
exports.get = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = PAGE_ACCESS_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};


// Handles messages events
function handleMessage(sender_psid, received_message) {

  let response;

  if (received_message.nlp.entities.hasOwnProperty('intent')) {

    let intent = received_message.nlp.entities.intent[0].value;
    let confidence = received_message.nlp.entities.intent[0].confidence;
    console.log(received_message.nlp.entities)
    response = helper.intentType(intent, confidence);

  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Le tek yo emej",
            "subtitle": "Tap dat button to answer",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } else if (received_message.text) {
    response = {
      "text": `This is out of NLP Logic scope, make me smarter, Noob`
    }
  }
  
  // Send the response message
  callSendAPI(sender_psid, response);    
}


// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "You're welcome :)" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}


// Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {
//   // Construct the message body
//   let request_body = {
//     "recipient": {
//       "id": sender_psid
//     },
//     "message": response
//   }

//   // Send the HTTP request to the Messenger Platform
//   request({
//     "uri": "https://graph.facebook.com/v2.6/me/messages",
//     "qs": { "access_token": PAGE_ACCESS_TOKEN },
//     "method": "POST",
//     "json": request_body
//   }, (err, res, body) => {
//     if (!err) {
//       console.log('message sent!')
//     } else {
//       console.error("Unable to send message:" + err);
//     }
//   });
// }

async function callSendAPI (sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  let url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN

  // const config = {
  //   headers: { 
  //     "Content-Type": "application/json"
  //   }
  // }

  try {
    let { data } = await axios.post(url, request_body)
  } catch(e) {
    console.log(e)
  }
    
}
