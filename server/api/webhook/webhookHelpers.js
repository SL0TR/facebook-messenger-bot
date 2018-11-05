"use strict";

const axios = require('axios'),
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


// Send response back with post request to facebook api
exports.callSendAPI = async function (sender_psid, response) {

  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  let senderAction = {
    loader: {
      "recipient": {
        "id": sender_psid
      },
      "sender_action":"typing_on"
    }
  }

  let url = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN

  try {
    await axios.post(url, senderAction.loader)
  } catch(e) {
    console.log(e)
  }

  try {
    await axios.post(url, request_body)
  } catch(e) {
    console.log(e)
  }

}


// Check the type of intent the user sent in message
exports.intentType = function(type, conf, uInfo) {

  let response;

  if (conf > 0.5) {
    response = {
      "text": `Hi ${uInfo.first_name}! I am ${Math.round(conf * 100)}% confident that your intent type is '${type}' :)`
    }
  } else {
    response = {
      "text": `Sorry ${uInfo.first_name}, You have no defined type of intent :(`
    }
  }

  return response;

}


// Handles messages events
exports.handleMessage = function (sender_psid, received_message, user_info) {

  let response;

  console.dir(received_message, { depth: null })

   if (received_message.hasOwnProperty('attachments')) {
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
  } else if (received_message.nlp.entities.hasOwnProperty('intent')) {

    let intent = received_message.nlp.entities.intent[0].value;
    let confidence = received_message.nlp.entities.intent[0].confidence;

    response = exports.intentType(intent, confidence, user_info);

  } else if (received_message.hasOwnProperty('text')) {
    response = {
      "text": `This is out of NLP Logic scope, make me smarter, Noob`
    }
  }

  // Send the response message
  exports.callSendAPI(sender_psid, response)

}


// Handles messaging_postbacks events
exports.handlePostback = function (sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {

    response = { 
      "text": "You're welcome :)" 
    }

  } else if (payload === 'no') {

    response = { "text": "Oops, try sending another image." }
  }

  // Send the message to acknowledge the postback
  exports.callSendAPI(sender_psid, response);

}

exports.getUserInfo = async function (psid) {
  // Send the HTTP request to the Messenger Platform
  let url = "https://graph.facebook.com/" + psid + "?fields=first_name,last_name,timezone,gender" + "&access_token=" + PAGE_ACCESS_TOKEN;

  try { 
    let { data } = await axios.get(url)
    return data
  } catch(e) {
    console.log(e)
  }
  
}
