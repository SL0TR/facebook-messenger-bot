
"use strict";

// Check the type of intent the user sent in message
exports.intentResponse = function(type, conf, userInfo) {

  let response;

  if (type === 'greeting') {
    
    response = {
      "text": `Hi, ${ userInfo && userInfo.gender === 'male' ?  'Mr ' + userInfo.first_name : 'Mrs ' + userInfo.first_name }! Thank you for messaging us. How can we assist you?`
    }

  } else if (type === 'compliment')  {

    response = {
      "text": `Thanks, we are glad to you liked it!`
    }

  } else if (type === 'criticism') {

    response = {
      "text": `Thank you for sharing your point of view, we are always open to constructive feedbacks`
    }

  } else if (type === 'insult') {

    response = {
      "text": `That's not a very nice thing to say!`
    }

  } else if (type === 'services') {

    let  response2 = exports.btnListResponse(type);
    console.dir(response2, null, true);
    
    response = {
        "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Try the postback button!",
          "buttons":[
            {
              "type": "postback",
              "title": "Marketing",
              "payload": "marketing",
            },
            {
              "type": "postback",
              "title": "Video Prduction",
              "payload": "vid-prod",
            },
            {
              "type": "postback",
              "title": "Branding",
              "payload": "branding",
            },
            {
              "type": "postback",
              "title": "Mobile App and Web Development",
              "payload": "mob-web-dev"
            }
          ]
        }
      }
    }

  } else {
    response = {
      "text": ` I'm Sorry ${ userInfo && userInfo.gender === 'male' ?  'Mr ' + userInfo.first_name : 'Mrs ' + userInfo.first_name }, I didn't get that, can you rephrase?`
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
              "payload": "yes"
            },
            {
              "type": "postback",
              "title": "No!",
              "payload": "no"
            }
          ]
        }]
      }
    }
  }

  return response;
}

exports.urlButtonResponse = function () {

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

exports.sliderResponse = function (type) {
  let response;

  if (type === 'work') {

    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
            {
              "title":"Welcome!",
              "image_url":"https://petersfancybrownhats.com/company_image.png",
              "subtitle":"We have the right hat for everyone.",
              "default_action": {
                "type": "web_url",
                "url": "https://petersfancybrownhats.com/view?item=103",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://petersfancybrownhats.com",
                  "title":"View Website"
                },{
                  "type":"postback",
                  "title":"Start Chatting",
                  "payload":"DEVELOPER_DEFINED_PAYLOAD"
                }              
              ]      
            }
          ]
        }
      }
    }

  } else if (type === 'clients') {
    
    // response = {
    //   "attachment":{
    //     "type":"template",
    //     "payload":{
    //       "template_type":"generic",
    //       "elements":[
    //         {
    //           "title":"Welcome!",
    //           "image_url":"https://petersfancybrownhats.com/company_image.png",
    //           "subtitle":"We have the right hat for everyone.",
    //           "default_action": {
    //             "type": "web_url",
    //             "url": "https://petersfancybrownhats.com/view?item=103",
    //             "webview_height_ratio": "tall",
    //           },
    //           "buttons":[
    //             {
    //               "type":"web_url",
    //               "url":"https://petersfancybrownhats.com",
    //               "title":"View Website"
    //             },{
    //               "type":"postback",
    //               "title":"Start Chatting",
    //               "payload":"DEVELOPER_DEFINED_PAYLOAD"
    //             }              
    //           ]      
    //         }
    //       ]
    //     }
    //   }
    // }

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

  }

}

exports.btnListResponse = function (type) {

  let response;

  if (type === 'services') {

      response = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Try the postback button!",
            "buttons":[
              {
                "type": "postback",
                "title": "Marketing",
                "payload": "marketing",
              },
              {
                "type": "postback",
                "title": "Video Prduction",
                "payload": "vid-prod",
              },
              {
                "type": "postback",
                "title": "Branding",
                "payload": "branding",
              },
              {
                "type": "postback",
                "title": "Mobile App and Web Development",
                "payload": "mob-web-dev"
              }
            ]
          }
        }
      }

    }

  return response;

}
