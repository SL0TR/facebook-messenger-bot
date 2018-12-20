"use strict";

const helper = require("./webhookHelpers"),
  axios = require("axios"),
  PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Send response back with post request to facebook api
exports.callSendAPI = async function(sender_psid, response) {
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };

  let senderAction = {
    loader: {
      recipient: {
        id: sender_psid
      },
      sender_action: "typing_on"
    }
  };

  let url =
    "https://graph.facebook.com/v2.6/me/messages?access_token=" +
    PAGE_ACCESS_TOKEN;

  try {
    await axios.post(url, senderAction.loader);
  } catch (e) {
    console.log(e);
  }

  try {
    await axios.post(url, request_body);
  } catch (e) {
    console.log("error code! : ", e.response.status);
  }
};

// Handles messages events
exports.handleMessage = function(sender_psid, received_message, user_info) {
  let response, intent, confidence;

  console.dir(received_message, { depth: null });

  if (received_message.attachments) {
    // Get the URL of the message attachment
    // let attachment_url = received_message.attachments[0].payload.url;

    response = helper.imgResponse();
  } else if (received_message.nlp.entities) {
    if (received_message.nlp.entities.intent) {
      intent = received_message.nlp.entities.intent[0].value;
      confidence = received_message.nlp.entities.intent[0].confidence;

      if (intent === "boomerang") {
        response = helper.urlButtonResponse(
          "We are a creative marketing agency who create practical, relevant and effective solutions for your business",
          "https://www.boomerangbd.com/about-us/",
          "About Us"
        );
        exports.callSendAPI(sender_psid, response);
        response = helper.intentResponse(intent, confidence, user_info, null);

        setTimeout(() => {
          exports.callSendAPI(sender_psid, response);
        }, 1500);

        return;
      }
      // get correct response according to nlp entity
      response = helper.intentResponse(
        intent,
        confidence,
        user_info,
        null,
        sender_psid
      );
      console.log(response);
    } else if (received_message.nlp.entities.greetings) {
      let greeting = received_message.nlp.entities.greetings[0].value;
      confidence = received_message.nlp.entities.greetings[0].confidence;

      // get correct response according to nlp entity
      response = helper.intentResponse(null, confidence, user_info, greeting);
    } else {
      response = {
        text: ` I'm sorry ${
          user_info && user_info.gender === "male"
            ? "Mr. " + user_info.first_name
            : "Mrs. " + user_info.first_name
        }, I didn't get that, can you rephrase? Or you could navigate to any of these sections`
      };

      exports.callSendAPI(sender_psid, response);

      response = helper.intentResponse("boomerang", null, user_info, null);
      setTimeout(() => {
        exports.callSendAPI(sender_psid, response);
      }, 1500);

      return;
    }
  }

  // Send the response message
  exports.callSendAPI(sender_psid, response);
};

// Handles messaging_postbacks events
exports.handlePostback = function(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "marketing") {
    response = helper.intentResponse(payload);
  } else if (payload === "vidProd") {
    response = helper.intentResponse(payload);
  } else if (payload === "branding") {
    response = helper.intentResponse(payload);
  } else if (payload === "mobWebDev") {
    response = helper.intentResponse(payload);
  } else if (payload === "uxUi") {
    response = helper.intentResponse(payload);
  } else if (payload === "content") {
    response = helper.intentResponse(payload);
  } else if (payload === "portfolio") {
    response = helper.intentResponse(payload);
  } else if (payload === "marketing-portfolio") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "vidProd-portolio") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "mobWebDev-portfolio") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "case-portfolio") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "branding-portfolio") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "clients") {
    helper.sliderResponse(sender_psid, payload);
  } else if (payload === "services") {
    response = helper.intentResponse(payload);
  } else if (payload === "clients") {
    response = helper.intentResponse(payload);
  } else if (payload === "assistance") {
      response = helper.intentResponse(payload);
  } else if (payload === "job") {
    helper.intentResponse(payload, null, null, null, sender_psid);
  } else {
    response = {
      text: `I didn't get that, can you rephrase?`
    };
  }

  // Send the message to acknowledge the postback
  exports.callSendAPI(sender_psid, response);
};

exports.getUserInfo = async function(psid) {
  // Send the HTTP request to the Messenger Platform
  let url =
    "https://graph.facebook.com/" +
    psid +
    "?fields=first_name,last_name,timezone,gender" +
    "&access_token=" +
    PAGE_ACCESS_TOKEN;

  try {
    let { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.log(e);
  }
};
