
"use strict";

exports.intentType = function(type, conf, uInfo) {

  let response;

  if (uInfo) {
    if (conf > 0.5) {
      response = {
        "text": `Hi, ${ uInfo.gender === 'male' ?  'Mr ' + uInfo.first_name : 'Mrs ' + uInfo.first_name }! I am ${Math.round(conf * 100)}% confident that your intent type is '${type}' :)`
      }
    } else {
      response = {
        "text": `Sorry, ${ uInfo.gender === 'male' ?  'Mr ' + uInfo.first_name : 'Mrs ' + uInfo.first_name }!, Couldn't detect an intent :(`
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
  return  (
    {
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
            ]
          }]
        }
      }
    }
  )
}