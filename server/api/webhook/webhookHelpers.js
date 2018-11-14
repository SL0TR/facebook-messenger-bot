
"use strict";

// Check the type of intent the user sent in message
exports.intentResponse = function(type, conf, userInfo, greet) {

  let response;

  if (greet && greet === 'true') {
    
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

    response = this.btnListResponse(type);

  } else if (type === 'instagram') {

    response = this.urlButtonResponse();

  } else if (type === 'job') {

    response = {
      "text": `We currently have these vacancies available, visit out site to know more.`
    }

  } else if (type === 'leave') {

    response = {
      "text": `Goodbye and take care ${ userInfo && userInfo.gender === 'male' ?  'Mr ' + userInfo.first_name : 'Mrs ' + userInfo.first_name }`, 
    }

  } else if (type === 'portfolio') {

    response = this.sliderResponse(type);

  } else {
    response = {
      "text": ` I'm sorry ${ userInfo && userInfo.gender === 'male' ?  'Mr ' + userInfo.first_name : 'Mrs ' + userInfo.first_name }, I didn't get that, can you rephrase?`
    }
  }

  return response;

}

exports.imgResponse = function () {
  let response;

  response = {
    "text": `Please send a text message instead of an image`
  }
  return response;
}

exports.urlButtonResponse = function () {

  let response;

  response = {
    "attachment": {
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

  if (type === 'portfolio') {

    response = {
      "attachment": {
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
            {
              "title":"WEB DESIGN FOR GRAMEENPHONE",
              "image_url":"https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_web_grameenphone.com_.jpg",
              "subtitle":"Seamless, user optimized web design for the largest Telco in Bangladesh",
              "default_action": {
                "type": "web_url",
                "url": "https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                  "title":"View Website"
                }             
              ]
            },
            {
              "title":"WEB DESIGN FOR GRAMEENPHONE",
              "image_url":"https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_web_grameenphone.com_.jpg",
              "subtitle":"Seamless, user optimized web design for the largest Telco in Bangladesh",
              "default_action": {
                "type": "web_url",
                "url": "https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                  "title":"View Website"
                }             
              ]
            },
            {
              "title":"WEB DESIGN FOR GRAMEENPHONE",
              "image_url":"https://www.boomerangbd.com/wp-content/uploads/2016/11/image_project_featured_web_grameenphone.com_.jpg",
              "subtitle":"Seamless, user optimized web design for the largest Telco in Bangladesh",
              "default_action": {
                "type": "web_url",
                "url": "https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://www.boomerangbd.com/our-work/web/web-design-grameenphone/",
                  "title":"View Website"
                }             
              ]
            },
          ]
        }
      }
    }

  } else if (type === 'clients') {

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

  return response;

}

exports.btnListResponse = function (type) {

  let response;

  if (type === 'services') {

    response = {
      "attachment":{
      "type":"template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Marketing",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Marketing",
                  "payload": "marketing",
                },
                {
                  "type": "postback",
                  "title": "Video Prduction",
                  "payload": "vidProd",
                },
                {
                  "type": "postback",
                  "title": "Branding",
                  "payload": "branding",
                }
              ]
            },
            {
              "title": "Tech", 
              "buttons": [
                {
                  "type": "postback",
                  "title": "Mobile App and Web Development",
                  "payload": "mobWebDev"
                },
                {
                  "type": "postback",
                  "title": "UX / UI Design",
                  "payload": "uxUi"
                },
                {
                  "type": "postback",
                  "title": "Content",
                  "payload": "content"
                }
              ]
            }
          ]
        }
      }
    }
  }

  return response;

}
