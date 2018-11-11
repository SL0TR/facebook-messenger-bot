
"use strict";

// Check the type of intent the user sent in message
exports.intentType = function(type, conf, uInfo) {

  let response;

  if (uInfo) {
    if (conf > 0.5) {
      response = {
        "text": `Hi, ${ uInfo.gender === 'male' ?  'Mr ' + uInfo.first_name : 'Mrs ' + uInfo.first_name }! Thank you for messaging us. How can we assist you?`
      }
      
    } else {
      response = {
        "text": ` I'm Sorry ${ uInfo.gender === 'male' ?  'Mr ' + uInfo.first_name : 'Mrs ' + uInfo.first_name }, I didn't get that, can you rephrase?`
      }
    }
  } else {
    if (conf > 0.5) {
      response = {
        "text": `Hi, confident that your intent type is '${type}' :)`
      }
    } else {
      response = {
        "text": `Sorry, Couldn't detect an intent :(`
      }
    }
  }


  return response;

}

exports.imgResponse = function (img_url) {
  let response;

  response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Le tek yo emej",
          "subtitle": "Tap dat button to answer",
          "image_url": img_url,
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

  return response;
}

exports.urlButton = function () {

  let response;

  response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Thank you for getting in touch with us! We will get back to you soon, in the meantime you can stalk us on our Instagram",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://www.instagram.com/helloboomerang",
            "title":"Boomerang Instagram"
          }
        ]
      }
    }
  }

  return response;
}